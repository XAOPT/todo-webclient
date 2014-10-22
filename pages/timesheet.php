<script>
function renderTimesheet() {
	instance = this;
	this.current_timestamp = new Date().getTime();
	this.current_day = parseInt(current_timestamp/86400/1000);
	this.from = current_day - 30*4;
	this.count = 130;
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

		for (var i=0; i<params.tasks.length; i++) {
			API.get.timesheet({"userid": params.userid, "taskid":params.tasks[i].id}, function(answer) {

				answer.items = _itemsInHash(answer.items, "day");

				tpl_data.task[i] = {
					"taskid": answer.taskid,
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

					var hours = (typeof answer.items[j] !== 'undefined')?answer.items[j].worktimeSeconds/3600:"&nbsp;";

					tpl_data.task[i].days[j-this.from] = {
						"day": j,
						"day_kind": day_kind,
						"hours": hours
					};
				}
			});
		}

		html = TEMPLATES.timesheet_taskbody(tpl_data);
		$(".task-hours table tbody").append(html);

	}

	this.drawUserTasks = function(tasks)
	{
		var html = '';
		for (var i=0; i<tasks.length; i++) {
			var tpl_data = {
				"tagcolor": this.projects[tasks[i].project].tagcolor,
				"shorttitle": this.projects[tasks[i].project].shorttitle,
				"title": tasks[i].title
			}

			html += TEMPLATES.timesheet_taskhead(tpl_data);
		}

		$(".task-list table tbody").append(html);
	}

	this.drawTimesheetCalendar = function()
	{
		var row1 = "<tr>";
		var row2 = "<tr>";
		var column_counter = 0;
		var prev_day = -1;
		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

		for (var i = this.from; i < this.from + this.count; i++) {
			var date    = new Date(i*86400*1000);
			var month   = months[date.getMonth()];
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
		row2 += "<th colspan='"+column_counter+"'>"+month+"</th>"
		row2 += "</tr>";
		$(".task-hours table thead").append(row2, row1);

		$(".task-hours .wrapper").animate({scrollLeft: 9999}, 0);
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

			API.get.task({"assignee": 39}, function(task_answer){
				API.get.calendar({"userid": 39, "from": this.from, "count": this.count}, function(calendar){
					var user_exceptions = {};
					for (var i=0; i<calendar.items.length; i++) {
						user_exceptions[calendar.items[i].day] = calendar.items[i];
					}

					this.drawUserTasks(task_answer.items);

					this.drawUserTimesheet({"userid": 39, "tasks": task_answer.items, "user_exceptions": user_exceptions});
				});
			});
		});
	});


}

$(document).ready(function(){

	renderTimesheet();

/*	$(".wrapper").scroll(function () {
		var scrollTop = $(this).scrollTop();
		$(".wrapper").scrollTop(scrollTop);
	});

	var $demoTable = $("table.demo1");
	$demoTable.floatThead({
		//the pageTop is a global function i have here, it takes care of making the table float under my floated nav
		scrollingTop: 0,
		scrollContainer: function($table){
			return $table.closest('.wrapper');
		},
		useAbsolutePositioning: true
	});

	var $demoTable = $("table.demo2");
	$demoTable.floatThead({
		//the pageTop is a global function i have here, it takes care of making the table float under my floated nav
		scrollingTop: 0,
		scrollContainer: function($table){
			return $table.closest('.wrapper');
		},
		useAbsolutePositioning: true
	});*/

	/*API.get.user(function(answer){
		var html = TEMPLATES.users_list({items: answer.items});

		$("#content-wrapper").append(html);
	});*/


});
</script>


	<div class="page-header">
		<h1>Timesheet</h1>
	</div>

	<div class="row">
		<div class="col-sm-12">

			<div id="timesheet">
				<div class="task-list wrapper" style="">
					<table class="table table-bordered demo1 table-primary">
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
						<tbody>
							<tr>
								<td colspan='5' class="user">Денис Петров</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="task-hours">
					<div class="wrapper">
						<table class="table table-bordered demo2 table-primary">
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
