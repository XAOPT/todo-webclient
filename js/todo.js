
$(document).ready(function() {

	for (var prop in TEMPLATES)
	{
		TEMPLATES[prop] = doT.template(TEMPLATES[prop]);
	}

	BootstrapDialog.prototype.updateAnimate = function(){return;};
	BootstrapDialog.configDefaultOptions({ onshown: function() {
		$("input[type=checkbox]").replaceWith(function(){
			return TEMPLATES.dom_checkbox({'checked': $(this).prop("checked"), 'theme': $(this).attr('class')});
		});
	} });

	BootstrapDialog.confirm = function(message, callback) {
		new BootstrapDialog({
			title: 'Confirmation',
			message: message,
			data: {
				'callback': callback
			},
			buttons: [
				{
					label: 'Cancel',
					action: function(dialog) {
						typeof dialog.getData('callback') === 'function' && dialog.getData('callback')(false, dialog);
						dialog.close();
					}
				},
				{
					label: 'OK',
					cssClass: 'btn-primary',
					action: function(dialog) {
						typeof dialog.getData('callback') === 'function' && dialog.getData('callback')(true, dialog);
						dialog.close();
					}
				}
			]
		}).open();
	};


	$(document).on('click', '.switcher', function(){
		$(this).toggleClass('checked');
		var box =  $(this).find('input');
		box.prop("checked", !box.prop("checked"));
	})

	/*left navigation */
	mainMenu.init();

	$(".toogleMenu").click(function(){
		$("BODY").toggleClass("mmc");
	});

	$( window ).resize(function() {
		var windowWidth = $( window ).width();

		if (windowWidth < 840) {
			$("BODY").addClass("mmc");
		}
	});

	/* top navigation */
	$(".profileDialog").click(function(){
		BootstrapDialog.show({
			title: "<h5>Профиль</h5>",
			message: $('<div></div>').load('profile.php')
		});
	});

	/* users */
	$("#content-wrapper").on('dblclick', '.user_card', function() {
		var this_id = $(this).data("id");
		API.get.user({id: this_id}, function(answer){
			BootstrapDialog.show({
				title: "<h5>Профиль</h5>",
				message: TEMPLATES.user_edit(answer.items[0])
			});
		});
	});

	/* timesheet */

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

					API.put.calendar(data);

					// изменим стиль у выбранной ячейки дня
					$(".task-hours table thead").find("TH[data-day="+data.day+"]").removeClass("workday, dayoff").addClass(data.kind);
				}
			});
		});
	});

	$("#content-wrapper").on('dblclick', '.task-hours td', function() {
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
							data['worktimeSeconds'] = item.value*3600;

						data[item.name] = item.value;
					});

					API.put.timesheet(data, function(data){
						$(".task-hours table tr[data-taskid='"+data.taskid+"'][data-userid='"+data.userid+"'] td[data-day='"+data.day+"']").text(data.worktimeHours);
					}.call(this, data));
				}
			});
		});
	});

	$("#content-wrapper").on('click', '.tt', function() {
		var taskid = $(this).parent().data("taskid");

		API.get.task({"id": taskid}, function(task) {
			API.get.comment({"taskid": taskid}, function(comments){
				API.get.project(function(projects){
					var tpl_data = {
						'task': task.items[0]
					};

					for (var i=0; i<comments.items.length; i++) {
						comments.items[i].text = bb2html(comments.items[i].text);
					}
					tpl_data['comments'] = comments.items;

					for (var i=0; i<projects.items.length; i++) {
						if (projects.items[i].id == task.items[0].project) {
							tpl_data['project'] = projects.items[i];
						}
					}



					$(".main-wrapper").addClass("rpo");

					$("#description").html(TEMPLATES.task_full(tpl_data));

					console.log(tpl_data);
				});
			});
		});
	});

	/* projects */

	$("#content-wrapper").on('click', '.project-title', function() {
		var this_id = $(this).data("id");
		API.get.project({id: this_id}, function(answer){
			$('.project-description').html(TEMPLATES.project_edit(answer.item));
		});
	});

	/* convert */

	$("#content-wrapper").on('click', '.convert_users', function() {
		API.get.convert.users(function(answer){
			BootstrapDialog.show({
				message: "OK"
			});
		});
	});

	$("#content-wrapper").on('click', '.convert_projects', function() {
		API.get.convert.projects(function(answer){
			BootstrapDialog.show({
				message: "OK"
			});
		});
	});

	$("#content-wrapper").on('click', '.convert_tasks', function() {
		API.get.convert.tasks(function(answer){
			BootstrapDialog.show({
				message: "OK"
			});
		});
	});
});

