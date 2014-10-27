<script>
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

					var hours = (typeof current_task_days[j] !== 'undefined')?current_task_days[j].worktimeSeconds/3600:"&nbsp;";

					tpl_data.task[i].days[j-this.from] = {
						"day": j,
						"day_kind": day_kind,
						"hours": hours
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

			API.get.user({"deleted":"0", "id": 39}, function(users){
				for (var i=0; i < users.items.length; i++) {
					$(".task-list .wrapper table tbody").append("<tr data-holderid='"+users.items[i].id+"'></tr>");
					$(".task-hours .wrapper table tbody").append("<tr data-holderid='"+users.items[i].id+"'></tr>");

					(function(i){
						API.get.task({"assignee": users.items[i].id, "status": ["open","inprogress"], "project":[3,19,21,24,25,28,33]}, function(task_answer){
							API.get.calendar({"userid": users.items[i].id, "from": this.from, "count": this.count}, function(calendar){
								var user_exceptions = {};
								for (var j=0; j<calendar.items.length; j++) {
									user_exceptions[calendar.items[j].day] = calendar.items[j];
								}

								this.drawUserTasks(users.items[i], task_answer.items);

								this.drawUserTimesheet({"userid": users.items[i].id, "tasks": task_answer.items, "user_exceptions": user_exceptions});
							});
						});
					})(i);
				}
			})
		});
	});
}

$(document).ready(function(){

	renderTimesheet();

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

	$.fn.editable.defaults.mode = 'popup';

	$('#filter_projects, #filter_user_groups').editable({
		placement: "left",
		source: [
			{value: 1, text: 'banana'},
			{value: 2, text: 'peach'},
			{value: 3, text: 'apple'},
			{value: 4, text: 'watermelon watermelon watermelon'},
			{value: 5, text: 'orange'},
			{value: 1, text: 'banana'},
			{value: 2, text: 'peach'},
			{value: 3, text: 'apple'},
			{value: 4, text: 'watermelon'},
			{value: 5, text: 'orange'},
			{value: 1, text: 'banana'},
			{value: 2, text: 'peach'},
			{value: 3, text: 'apple'},
			{value: 4, text: 'watermelon'},
			{value: 5, text: 'orange'},
			{value: 3, text: 'apple'},
			{value: 4, text: 'watermelon'},
			{value: 5, text: 'orange'},
			{value: 1, text: 'banana'},
			{value: 2, text: 'peach'},
			{value: 3, text: 'apple'},
			{value: 4, text: 'watermelon'},
			{value: 5, text: 'orange'},

		]
	});
});
</script>


<div class="page-header">
	<h1>Timesheet</h1>
</div>

<div class="page-header-menu">
	<button class="btn btn-flat btn-sm btn-labeled btn-primary" id="toggle-filter-options"><span class="btn-label icon fa fa-filter"></span>Фильтр</button>
</div>

<div class="row">
	<div class="col-sm-12 filter-options panel">
		<div class="panel-heading">
			<span class="panel-title"><i class="panel-title-icon fa fa-comments-o"></i>Настройки фильтра</span>
		</div>
		<div class="panel-body">
			<table id="user" class="table table-bordered table-striped" style="clear: both">
				<tbody>
					<tr>
						<td width="35%">Группы пользователей</td>
						<td width="65%"><a href="#" id="filter_user_groups" data-type="checklist" class="editable editable-click" data-title="Выберите группы">Выбор</a></td>
					</tr>
					<tr>
						<td>Проекты</td>
						<td><a href="#" id="filter_projects" data-type="checklist" data-title="Укажите проекты" class="editable editable-click" data-original-title="" title="">Выбор</a></td>
					</tr>
				</tbody>
			</table>
			<div class="alert alert-warning">Внимание! Большой список пользователей и проектов может привезти к замедлению работы страницы!</div>
			<button class="btn btn-flat btn-sm btn-success">OK</button>
		</div>
	</div>
</div>

	<div class="row">
		<div class="col-sm-12">

			<div id="timesheet">
				<div class="task-list">
					<table class="table table-bordered table-primary">
						<thead>
							<tr>
								<th colspan='5'>Задачи по пользователям</th>
							</tr>
							<tr>
								<th>Пр</th>
								<th></th>
								<th class='tt'>Название</th>
								<th>Тр</th>
								<th>Ф.тр</th>
							</tr>
						</thead>
					</table>
					<div class='wrapper'>
						<table class="table table-bordered">
							<tbody>
							</tbody>
						</table>
					</div>
				</div>
				<div class="task-hours">
					<div class="table-head">
						<table class="table table-bordered table-primary">
							<thead>
							</thead>
						</table>
					</div>
					<div class="wrapper">
						<table class="table table-bordered">
							<thead>
							</thead>
							<tbody>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
