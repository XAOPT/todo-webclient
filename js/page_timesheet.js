/*
	эта функция оживляет форму с таском. делает её доступной для редактирования. используется в нескольких местах: например при добавлении нового и просмотре старого таска
*/
function make_task_editable(parent_selector) {

	// редактирование описания задачи
	$(parent_selector+' #comment').editable({
		mode: "inline",
		showbuttons: "bottom",
		url: function(params) {
			API.put.comment({id: params.pk, text: params.value});
		}
	});

	// приоритет
	$(parent_selector+' #priority').editable({
		source: [
			{value: 0, text: "Minor"},
			{value: 1, text: "Major"},
			{value: 2, text: "Critical"},
			{value: 3, text: "Blocker"}
		],
		url: function(params) {
			API.put.task({id: params.pk, priority: params.value});
		}
	});

	// тип задачи
	$(parent_selector+' #type').editable({
		source: [
			{value: "feature", text: "feature"},
			{value: "folder", text: "folder"},
			{value: "issue", text: "issue"},
			{value: "milestone", text: "milestone"},
			{value: "task", text: "task"},
			{value: "testcase", text: "testcase"}
		],
		url: function(params) {
			API.put.task({id: params.pk, type: params.value});
		}
	});

	//  статус задачи
	$(parent_selector+' #status').editable({
		source: [
			{value: "canceled", text: "canceled"},
			{value: "closed", text: "closed"},
			{value: "finished", text: "finished"},
			{value: "inprogress", text: "inprogress"},
			{value: "open", text: "open"},
			{value: "reopened", text: "reopened"}
		],
		url: function(params) {
			API.put.task({id: params.pk, status: params.value});
		}
	});
}

function renderTimesheet() {
	instance = this;
	this.current_timestamp = new Date().getTime();
	this.current_day = parseInt(current_timestamp/86400/1000);
	this.from = current_day - 30*4;
	this.count = 131;
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
			"task": []
		};
		if (params.tasks.length == 0) {
			$(".task-hours .wrapper table tbody tr[data-holderid='"+params.userid+"']").replaceWith("<tr><td colspan="+this.count+">&nbsp;</td></tr>");
			return;
		}

		var task_ids = [];
		for (var i=0; i<params.tasks.length; i++) {
			task_ids[i] = params.tasks[i].id;
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


	}

	this.drawUserTasks = function(user,tasks)
	{
		var html = '';
		html += TEMPLATES.timesheet_taskhead_user(user);

		for (var i=0; i<tasks.length; i++) {
			var tpl_data = {
				"tagcolor": (typeof this.projects[tasks[i].project] !== 'undefined')?this.projects[tasks[i].project].tagcolor:'',
				"shorttitle": (typeof this.projects[tasks[i].project] !== 'undefined')?this.projects[tasks[i].project].shorttitle:'',
				"task": tasks[i]
			}

			html += TEMPLATES.timesheet_taskhead(tpl_data);
		}

		$(".task-list .wrapper table tbody tr[data-holderid='"+user.id+"']").replaceWith(html);
	}

	this.drawTimesheetCalendar = function()
	{
		var row1 = "<tr>";
		var row2 = "<tr>";
		var column_counter = 0;
		var prev_day = -1;
		var date;
		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

		for (var i = this.from; i < this.from + this.count; i++) {
			date    = new Date(i*86400*1000);
			var month   = months[date.getMonth()-1];
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

			prev_day = day;
		}

		row1 += "</tr>";
		row2 += "<th colspan='"+column_counter+"'>"+months[date.getMonth()];+"</th>"
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
		API.get.project(function(answer) {
			for (var i=0; i<answer.items.length; i++) {
				this.projects[answer.items[i].id] = answer.items[i];
			}

			/* извлечём всех пользователей */
			API.get.user({"deleted":"0", "id": 39}, function(users){
				for (var i=0; i < users.items.length; i++) {
					$(".task-list .wrapper table tbody").append("<tr data-holderid='"+users.items[i].id+"'></tr>");
					$(".task-hours .wrapper table tbody").append("<tr data-holderid='"+users.items[i].id+"'></tr>");

					(function(i){
						/* получим все задачи для Итого пользователя с фильтрацией по проектам */
						API.get.task({"assignee": users.items[i].id, "status": ["open","inprogress"], "project":[3,19,21,24,25,28,33]}, function(task_answer){

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
			})
		});
	});
}

function init_timesheet_interface() {
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

	$("#toggle-filter-options").click(function(){
		$(".filter-options").slideToggle();
	});

	/* кнопка добавления таска. открывает диалог и оживляет его */
	$("#add-task-button").click(function(){
		API.get.project(function(projects) {
			API.get.user({"deleted":0}, function(users) {
				/* отрисуем диалог */
				BootstrapDialog.confirm(TEMPLATES.task_full({projects: projects.items, users: users.items}), {
						title: "<h5>Добавить задачу</h5>",
						cssClass: 'wide'
					}, function(result, dialogRef) {
						/* если пользователь нажал кнопку "добавить" - сабмитим форму */
						if (result) {
							var data = {};
							dialogRef.getModal().find('form').serializeArray().map(function(item) {
								data[item.name] = item.value;
							});

							API.post.task(data, function() {
								$.growl("Задача добавлена");
							});
						}
					}
				);
			});
		});

		make_task_editable(".modal")
	});

	API.get.project(function(answer) {
		var source = [];
		for (var i=0; i<answer.items.length; i++)
		{
			source[i] = {
				value: answer.items[i].id,
				text: answer.items[i].title
			};
		}
		$('#filter_projects').editable({
			"placement": "left",
			"source": source,
			"url": "/post.php"
		});

		$('#filter_user_groups').editable({
			"placement": "left",
			"source": [
				{value: 'worker', text: 'worker'},
				{value: 'manager', text: 'manager'},
				{value: 'admin', text: 'admin'}
			]
		});
	});
}

$(document).ready(function() {

	/* просмотр описания таска */
	$("#content-wrapper").on('click', '.tt', function() {
		var taskid = $(this).parent().data("taskid");

		API.get.task({"id": taskid}, function(task) {
			API.get.comment({"taskid": taskid}, function(comments){
				API.get.project(function(projects){
					var tpl_data = {
						'task': task.items[0],
						'attachments': []
					};

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

					$(".main-wrapper").addClass("rpo");

					$("#description").html(TEMPLATES.task_full(tpl_data));

					make_task_editable("#description");
					new Dropzone(".dropzone", {
						dictDefaultMessage: "<i class='fa fa-cloud-upload'></i>Перетащите сюда файл<br><span class='dz-text-small'>или нажмите для выбора из каталога</span>",
						url: API.url+"/task/"+taskid+"/attachment",
						error: function(file, error) {
							$.growl("<b>"+error.ErrorCode+":</b> "+error.ErrorMessage, {type: "danger"});
						}
					});
				});
			});
		});
	});
});