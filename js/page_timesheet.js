var editable_sources = {
	"priority": [
		{value: 0, text: "Minor"},
		{value: 1, text: "Major"},
		{value: 2, text: "Critical"},
		{value: 3, text: "Blocker"}
	],
	"type": [
		{value: "feature", text: "feature"},
		{value: "folder", text: "folder"},
		{value: "issue", text: "issue"},
		{value: "milestone", text: "milestone"},
		{value: "task", text: "task"},
		{value: "testcase", text: "testcase"}
	],
	"status": [
		{value: "canceled", text: "canceled"},
		{value: "closed", text: "closed"},
		{value: "finished", text: "finished"},
		{value: "inprogress", text: "inprogress"},
		{value: "open", text: "open"},
		{value: "reopened", text: "reopened"}
	]
};
/*
	эта функция оживляет форму с таском. делает её доступной для редактирования. используется в нескольких местах: например при добавлении нового и просмотре старого таска
*/
function make_task_editable(parent_selector) {

	// редактирование описания задачи
	$(parent_selector+' #comment').click(function() {
		$(this).summernote().after("<button class='btn btn-flat btn-sm btn-labeled btn-success' id='save_comment'>Сохранить</button>");
	});

	// приоритет
	$(parent_selector+' #priority').editable({
		source: editable_sources.priority,
		url: function(params) {
			API.put.task({id: params.pk, priority: params.value});
		}
	});

	// тип задачи
	$(parent_selector+' #type').editable({
		source: editable_sources.type,
		url: function(params) {
			API.put.task({id: params.pk, type: params.value});
		}
	});

	//  статус задачи
	$(parent_selector+' #status').editable({
		source: editable_sources.status,
		url: function(params) {
			API.put.task({id: params.pk, status: params.value});
		}
	});
}

function renderTimesheet() {
	instance = this;
	this.current_timestamp = new Date().getTime();
	this.current_day = parseInt(current_timestamp/86400/1000);
	this.from = current_day - 30*3;
	this.count = 100;
	this.projects = {};

	this.is_weakend = function(day_int) {
		var date    = new Date(day_int*86400*1000);
		var day     = date.getDate();
		var day_num = date.getDay();

		return (day_num === 0 || day_num === 6)?'dayoff':'workday';
	}

	this.drawUserTimesheet = function(params)
	{
		var tpl_data = {
			"day_count": this.count,
			"task": [],
			"summary": []
		};

		if (params.tasks.length == 0) {
			$(".task-hours .wrapper table tbody tr[data-holderid='"+params.userid+"']").replaceWith("<tr><td colspan="+this.count+">&nbsp;</td></tr>");
			return;
		}

		var task_ids = []; // соберём айдишники тасков, чтобы отправить их в апи для получения часов
		for (var i=0; i<params.tasks.length; i++) {
			task_ids[i] = params.tasks[i].id;
		}

		API.get.timesheet.summary({"userid": params.userid, "from": this.from, "count": this.count}, function(answer) {

			var items = answer.items;
			for (var i=0; i < items.length; i++){
				tpl_data.summary[items[i].day-this.from] = items[i].worktimeSeconds/3600;
			}

			for (i=0; i<this.count; i++) {
				if (typeof tpl_data.summary[i] === 'undefined')
					tpl_data.summary[i] = 0;
			}

			API.get.timesheet({"userid": params.userid, "taskid":task_ids}, function(answer) {

				for (var i=0; i < answer.taskid.length; i++) {

					var current_task = answer.taskid[i];

					var current_task_days = {};

					var length = answer.items.length;
					for (var j = 0; j < length; j++) {
						if (current_task == answer.items[j].taskid)
							current_task_days[answer.items[j].day] = answer.items[j];
					}

					tpl_data.task[i] = {
						"taskid": answer.taskid[i],
						"userid": answer.userid,
						"days": []
					};

					for (var j = this.from; j < this.from + this.count; j++) {

						var day_kind = this.is_weakend(j);

						if (typeof params.user_exceptions[j] !== 'undefined') {
							day_kind = params.user_exceptions[j].kind; // пользовательские исключения для календаря выше в приоритете
						}
						else if (typeof this.global_exceptions[j] !== 'undefined') {
							day_kind = this.global_exceptions[j].kind; // глобальные исключения для календаря
						}

						tpl_data.task[i].days[j-this.from] = {
							"day": j,
							"day_kind": day_kind,
							"hours": (typeof current_task_days[j] !== 'undefined')?current_task_days[j].worktimeSeconds/3600:"&nbsp;",
							"comment": (typeof current_task_days[j] !== 'undefined')?current_task_days[j].comment:""
						};
					}
				}

				html = TEMPLATES.timesheet_taskbody(tpl_data);

				$(".task-hours .wrapper table tbody tr[data-holderid='"+params.userid+"']").replaceWith(html);
				$(".task-hours .wrapper").animate({scrollLeft: 9999}, 0);
			});
		});
	}

	this.drawUserTasks = function(user, tasks)
	{
		var tpl_data = {
			"user": user,
			"tasks": []
		};

		for (var i=0; i<tasks.length; i++) {
			tpl_data.tasks[i] = {
				"project_tagcolor": (typeof this.projects[tasks[i].project] !== 'undefined')?this.projects[tasks[i].project].tagcolor:'',
				"project_shorttitle": (typeof this.projects[tasks[i].project] !== 'undefined')?this.projects[tasks[i].project].shorttitle:'',
				"params": tasks[i]
			}
		}

		$(".task-list .wrapper table tbody tr[data-holderid='"+user.id+"']").replaceWith(TEMPLATES.timesheet_taskhead(tpl_data));
	}

	this.drawTimesheetCalendar = function()
	{
		$(".task-hours table.table-primary thead").html('');
		var row1 = "<tr>";
		var row2 = "<tr>";
		var column_counter = 0;
		var prev_day = -1;
		var date;
		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

		for (var i = this.from; i < this.from + this.count; i++) {
			date    = new Date(i*86400*1000);
			var day     = date.getDate();
			var day_kind = this.is_weakend(i);

			if (typeof this.global_exceptions[i] !== 'undefined') {
				day_kind = this.global_exceptions[i].kind;
			}

			var th_class = (current_day == i)?'current_day':day_kind;

			row1 += "<th data-day='"+i+"' data-kind='"+day_kind+"' class='timesheet-day "+th_class+"''>"+day+"</th>";

			if (prev_day > day) {
				row2 += "<th colspan='"+column_counter+"'>"+month+"</th>"
				column_counter = 1;
			}
			else {
				column_counter++;
			}

			var month   = months[date.getMonth()];
			prev_day = day;
		}

		row1 += "</tr>";
		row2 += "<th colspan='"+column_counter+"'>"+months[date.getMonth()]+"</th>"
		row2 += "</tr>";
		$(".task-hours table.table-primary thead").append(row2, row1);
		$(".task-hours .table-head").animate({scrollLeft: 9999}, 0);
	}

	/* начнём с отрисовки шапки календаря */
	API.get.calendar({"from": this.from, "count": this.count}, function(answer) {

		this.global_exceptions = {};

		for (var i=0; i<answer.items.length; i++) {
			this.global_exceptions[answer.items[i].day] = answer.items[i];
		}

		this.drawTimesheetCalendar();

		/* теперь отрисуем задачи */
		API.get.user.clientSettings(function(clientSettings) {

			API.get.project(function(answer) {
				for (var i=0; i<answer.items.length; i++) {
					this.projects[answer.items[i].id] = answer.items[i];
				}

				//{"filter_projects":[],"filter_priority":[],"filter_assignee":["42"]}
				var user_request_params = {
					deleted: 0
				};

				user_request_params.id = (typeof clientSettings.filter_assignee !== 'undefined' )?clientSettings.filter_assignee:API.me.id;

				/* извлечём всех пользователей */
				API.get.user(user_request_params, function(users){

					for (var i=0; i < users.items.length; i++) {

						if (i == 0)
							$(".task-list .wrapper table tbody, .task-hours .wrapper table tbody").html(''); // зачистим для начала табличку

						$(".task-list .wrapper table tbody").append("<tr data-holderid='"+users.items[i].id+"'></tr>");
						$(".task-hours .wrapper table tbody").append("<tr data-holderid='"+users.items[i].id+"'></tr>");

						(function(i){
							/* определимся с параметрами фильтрации задач */
							var filter = {};

							filter.project  = (typeof clientSettings.filter_projects !== 'undefined')?clientSettings.filter_projects:[3,19,21,24,25,28,33];
							filter.assignee = (typeof clientSettings.filter_assignee !== 'undefined')?clientSettings.filter_assignee:users.items[i].id;
							filter.status   = (typeof clientSettings.filter_status !== 'undefined')?clientSettings.filter_status:["open","inprogress"];
							filter.assignee   = users.items[i].id;
							if (typeof clientSettings.filter_priority !== 'undefined') filter.priority = clientSettings.filter_priority;

							/* получим все задачи для i-того пользователя с фильтрацией по проектам */
							API.get.task(filter, function(task_answer){
								/* получим для этого пользователя исключения в календаре */
								API.get.calendar({"userid": users.items[i].id, "from": this.from, "count": this.count}, function(calendar){
									var user_exceptions = {};
									for (var j=0; j<calendar.items.length; j++) {
										user_exceptions[calendar.items[j].day] = calendar.items[j];
									}

									/* отрисуем список задач пользователя на основе полученных данных */
									this.drawUserTasks(users.items[i], task_answer.items);

									/* и таблицу с часами тоже нарисуем */
									this.drawUserTimesheet({"userid": users.items[i].id, "tasks": task_answer.items, "user_exceptions": user_exceptions});
								});
							});
						})(i);
					}
				});
			});
		});
	});
}

function init_timesheet_interface(cb) {
	var prev_top = 0;
	$(".task-hours .wrapper").scroll(function () {
		var scrollTop = $(this).scrollTop();

		if (scrollTop !== prev_top) {
			$(".task-list .wrapper").scrollTop(scrollTop);
			prev_top = scrollTop;
		}
		else {
			var scrollLeft = $(this).scrollLeft();
			$(".task-hours .table-head").animate({scrollLeft: scrollLeft}, 0);
		}
	});

	/* нажатие на кнопку настройки фильтра задач */
	$("#toggle-filter-options").click(function(){
		BootstrapDialog.confirm(TEMPLATES.task_filter(), {
				title: "<h5>Настройки фильтра</h5>"
			}, function(result, dialogRef) {
				/* если пользователь нажал кнопку "добавить" - сабмитим форму */
				if (result) {
					var data = xeditableSerialize("#timesheetFilter");

					API.get_me(function(){
						API.put.user.clientSettings(data, function(){
							renderTimesheet();
						});
					});
				}
			}
		);

		API.get.user.clientSettings(function(clientSettings) {

			// извлекаем данные для формирования фильтра
			API.get.project(function(answer) {
				API.get.user({"deleted": 0}, function(user_list){
					var project_source = [];
					var assignee_source = [];

					for (var i=0; i<answer.items.length; i++)
					{
						project_source[i] = {
							value: answer.items[i].id,
							text: answer.items[i].title
						};
					}
					for (var i=0; i<user_list.items.length; i++)
					{
						assignee_source[i] = {
							value: user_list.items[i].id,
							text: user_list.items[i].firstname + ' ' + user_list.items[i].lastname
						};
					}

					$('#timesheetFilter #filter_user_groups').editable({
						"placement": "left",
						"source": [
							{value: 'worker', text: 'worker'},
							{value: 'manager', text: 'manager'},
							{value: 'admin', text: 'admin'}
						],
						"value": (typeof clientSettings.filter_user_groups !== 'undefined')?clientSettings.filter_user_groups:null
					});

					$('#timesheetFilter #filter_projects').editable({
						"placement": "left",
						"source": project_source,
						"value": (typeof clientSettings.filter_projects !== 'undefined')?clientSettings.filter_projects:null
					});

					$('#timesheetFilter #filter_assignee').editable({
						"placement": "left",
						"source": assignee_source,
						"value": (typeof clientSettings.filter_assignee !== 'undefined')?clientSettings.filter_assignee:API.me.id
					});

					// приоритет
					$("#timesheetFilter #filter_priority").editable({
						"placement": "left",
						source: editable_sources.priority,
						"value": (typeof clientSettings.filter_priority !== 'undefined')?clientSettings.filter_priority:null
					});

					//  статус задачи
					$("#timesheetFilter #filter_status").editable({
						"placement": "left",
						source: editable_sources.status,
						"value": (typeof clientSettings.filter_status !== 'undefined')?clientSettings.filter_status:null
					});
				});
			});
		});
	});

	/* кнопка добавления таска. открывает диалог и оживляет его */
	$("#add-task-button").click(function(){
		API.get.project(function(projects) {
			API.get.user({"deleted":0}, function(users) {
				/* отрисуем диалог */
				BootstrapDialog.confirm(TEMPLATES.task_full({projects: projects.items, users: users.items}), {
						title: "<h5>Добавить задачу</h5>",
						cssClass: 'wide',
						afterRender: function() {
							$("textarea[name='comment']").summernote({height: null});
						}
					}, function(result, dialogRef) {
						/* если пользователь нажал кнопку "добавить" - сабмитим форму */
						if (result) {
							var data = {};
							dialogRef.getModal().find('form').serializeArray().map(function(item) {
								data[item.name] = item.value;
							});

							API.post.task(data, function(answer) {
								var comment =  dialogRef.getModal().find("textarea[name='comment']").code();
								dialogRef.getModal().find("textarea[name='comment']").destroy();

								API.post.comment({taskid: answer.id, text: comment}, function(){
									$.growl("Задача добавлена");
									renderTimesheet();
								});
							});
						}
					}
				);
			});
		});
	});

	API.get_me(function(){
		renderTimesheet();
	});
}

$(document).ready(function() {

	/* просмотр описания таска */
	$("#content-wrapper").on('click', '.tt', function() {
		var taskid = $(this).parent().data("taskid");
		$('.tt').removeClass("active");
		$(this).addClass("active");

		$(".main-wrapper").addClass("rpo");
		$("#description").html('');

		API.get.task({"id": taskid}, function(task) {
			API.get.comment({"taskid": taskid}, function(comments) {
				API.get.microtask({"taskid": taskid}, function(microtask) {
					API.get.project(function(projects) {
						API.get.user({id: task.items[0].createdby}, function(createdby){
							var tpl_data = {
								'task': task.items[0],
								'microtask': microtask.items,
								'attachments': []
							};

							tpl_data.task.createdby = createdby.items[0];

							for (var i=0; i<comments.items.length; i++) {
								comments.items[i].text = bb2html(comments.items[i].text);
							}
							tpl_data['comments'] = comments.items;

							/// вот это вот шляпа про проект - поправить
							for (var i=0; i<projects.items.length; i++) {
								if (projects.items[i].id == task.items[0].project) {
									tpl_data['project'] = projects.items[i];
								}
							}

							// разберёмся с вложенными файлами
							if (typeof task.items[0].attachments !== 'undefined') {
								for (var i=0; i<task.items[0].attachments.length; i++) {
									tpl_data.attachments[i] = task.items[0].attachments[i];
									tpl_data.attachments[i].is_image = true;
									tpl_data.attachments[i].full_url = API.url+task.items[0].attachments[i].url;
								}
							}

							$("#description").html(TEMPLATES.task_full(tpl_data));

							make_task_editable("#description");

							// dropzone
							$(".dz-hidden-input").remove(); // подчистим концы от предыдущих инициализаций dropzone
							$(".dropzone").dropzone({
								dictDefaultMessage: "<i class='fa fa-cloud-upload'></i>Перетащите сюда файл<br><span class='dz-text-small'>или нажмите для выбора из каталога</span>",
								url: API.url+"/task/"+taskid+"/attachment?auth_token="+todo_session_key+"&session_user="+todo_session_user,
								error: function(file, error) {
									$.growl("<b>"+error.ErrorCode+":</b> "+error.ErrorMessage, {type: "danger"});
								}
							});
						});
					});
				});
			});
		});
	});

	/* форма изменения типа дня на выходной-рабочий */
	$("#content-wrapper").on('dblclick', '.timesheet-day', function() {
		var day = $(this).data("day");
		var day_kind = $(this).data("kind");

		API.get.calendar({"from": day, "count": 1}, function(answer) {
			day_kind = (typeof answer.items[0] !== 'undefined')?answer.items[0].kind:day_kind;

			BootstrapDialog.confirm(TEMPLATES.calendar_edit({day: day, kind: day_kind}), function(result, dialogRef){
				if (result) {
					data = {};
					dialogRef.getModal().find('form').serializeArray().map(function(item) {
						if (item.name == 'dayoff' && item.value == 'on')
							data['kind'] = 'dayoff';
						else
							data[item.name] = item.value;
					});

					if (typeof data['kind'] === 'undefined')
						data['kind'] = 'workday';

					API.put.calendar(data, function(){
						renderTimesheet();
					});
				}
			});
		});
	});

	/* форма редактирования количества часов потраченных на выполнение задачи в какой-то день + комментарий */
	$("#content-wrapper").on('click', '.task-hours td', function() {
		var day = $(this).data("day");
		var taskid = $(this).parent().data("taskid");
		var userid = $(this).parent().data("userid");

		API.get.timesheet({"from": day, "count": 1, "userid": userid, "taskid": taskid}, function(answer) {

			var tpl_data = {
				'day': day,
				'taskid': taskid,
				'userid': userid,
				'item': answer.items[0]
			};

			if (typeof answer.items[0] != 'undefined') {
				tpl_data.item.worktimeHours = tpl_data.item.worktimeSeconds/3600;
			}

			BootstrapDialog.confirm(TEMPLATES.timesheet_edit(tpl_data), function(result, dialogRef){
				if (result) {
					data = {};
					dialogRef.getModal().find('form').serializeArray().map(function(item) {
						if (item.name == 'worktimeHours')
							data['worktimeSeconds'] = item.value.replace(/,/, '.')*3600;

						data[item.name] = item.value;
					});

					if (typeof data['worktimeSeconds'] !== 'undefined' && data['worktimeSeconds'] > 3600*20) {
						$.growl("Вы указали недопустимое количество часов", {type: "danger"});
						return;
					}

					API.put.timesheet(data, function(data){
						renderTimesheet();
					}.call(this, data));
				}
			});
		});
	});

	/* нажатие на описание задачи перевод в режим редактирования описания */
	$("#content-wrapper").on('click', '#save_comment', function() {
		$(this).remove();
		var params = {
			id: $('#comment').data('pk'),
			text: $('#comment').code()
		};

		$('#comment').destroy();
		$('#comment').html(params.text);

		if (typeof params.id === 'undefined' || params.id == 0) {
			params.taskid = $('#comment').data('taskid');

			API.post.comment(params, function(answer){
				$('#comment').data('pk', answer.id);
				$.growl("Комментарий добавлен");
			});
		}
		else {
			API.put.comment(params, function(){
				$.growl("Описание отредактировано");
			});
		}
	});

	/* нажатие на кнопочку добавления микротаска */
	$(document).on('click', '.add-microtask', function() {
		$(this).hide();
		var params = {
			id: $(this).data('taskid')
		};

		$(".add-microtask-detail").show();
	});

	$(document).on('click', '.create-microtask', function() {
		$(".add-microtask-detail").hide();

		var params = {
			taskid: $(this).data('taskid'),
			text: $("input[name='microtask-text']").val()
		};

		API.post.microtask(params, function(answer){
			$(".add-microtask").show();
			$("input[name='microtask-text']").val('');
			$(".microtask_list").append(' \
				<div class="microtask"> \
					<input type="checkbox" class="microtask_checkbox" data-pk="'+answer.id+'"> \
					<label>'+params.text+'</label> \
				</div> \
			');
		});
	});

	$(document).on('click', '.microtask_checkbox', function(){
		var checkbox = $(this);
		var params = {
			id: checkbox.parent().data("pk"),
			status: (checkbox.is(":checked"))?"finished":"open"
		};

		API.put.microtask(params, function(){
			checkbox.parent().toggleClass("checked");
		});
	});

	$(document).on('click', '.microtask_remove', function(){
		var microtask = $(this).parent();
		API.delete.microtask({id: microtask.data("pk")}, function() {
			microtask.remove();
		});
	});
});