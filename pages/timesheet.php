<script>
$(document).ready(function(){
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

	var current_timestamp = new Date().getTime();
	var current_day = parseInt(current_timestamp/86400/1000);
	var lower_day = current_day - 30*4;

	/* начнём с отрисовки шапки календаря */
	API.get.calendar({"from": lower_day, "count": 130}, function(answer) {
		var global_exceptions = {};
		for (var i=0; i<answer.items.length; i++) {
			global_exceptions[answer.items[i].day] = answer.items[i];
		}

		drawTimesheetCalendar({"from": lower_day, "count": 130, "exceptions": global_exceptions});

		/* теперь отрисуем задачи */
		API.get.project(function(answer) {
			var projects = {};
			for (var i=0; i<answer.items.length; i++) {
				projects[answer.items[i].id] = answer.items[i];
			}

			API.get.task({"assignee": 39}, function(answer){
				API.get.calendar({"userid": 39, "from": lower_day, "count": 130}, function(calendar){
					var user_exceptions = {};
					for (var i=0; i<calendar.items.length; i++) {
						user_exceptions[calendar.items[i].day] = calendar.items[i];
					}

					drawUserTasks({"projects": projects, "tasks": answer.items});
					drawUserTimesheet({"from": lower_day, "count": 130, "tasks": answer.items, "exceptions": global_exceptions, "user_exceptions": user_exceptions});
				});
			});
		});

	});

	function drawUserTasks(params)
	{
		var html = '';
		for (var i=0; i<params.tasks.length; i++) {
			html += "<tr>";
			html += "	<td>"+params.projects[params.tasks[i].project].shorttitle+"</td>";
			html += "	<td></td>";
			html += "	<td class='tt'>"+params.tasks[i].title+"</td>";
			html += "	<td></td>";
			html += "	<td></td>";
			html += "</tr>";
		}

		$(".task-list table tbody").append(html);
	}

	function drawUserTimesheet(params)
	{
		$(".task-hours table tbody").append("<tr><td colspan='"+params.count+"'>&nbsp;</td></tr>");

		for (var i=0; i<params.tasks.length; i++) {
			API.get.timesheet({"userid":39, "taskid":params.tasks[i].id}, function(){
				html = "<tr>";
				for (var i=params.from; i<params.from+params.count; i++) {
					var date    = new Date(i*86400*1000);
					var day     = date.getDate();
					var day_num = date.getDay();

					var day_kind = (day_num === 0 || day_num === 6)?'dayoff':'workday';

					if (typeof params.user_exceptions[i] !== 'undefined') {
						day_kind = params.user_exceptions[i].kind; // пользовательские исключения для календаря выше в приоритете
					}
					else if (typeof params.exceptions[i] !== 'undefined') {
						day_kind = params.exceptions[i].kind; // глобальные исключения для календаря
					}

					html += "<td class='"+day_kind+"'>&nbsp;</td>";
				}
				html += "</tr>";

				$(".task-hours table tbody").append(html);
			});
		}
	}

	function drawTimesheetCalendar(params)
	{
		var row1 = "<tr>";
		var row2 = "<tr>";
		var column_counter = 0;
		var prev_day = -1;
		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

		for (var i=params.from; i<params.from+params.count; i++) {
			var date    = new Date(i*86400*1000);
			var month   = months[date.getMonth()];
			var day     = date.getDate();
			var day_num = date.getDay();

			var day_kind = (day_num === 0 || day_num === 6)?'dayoff':'workday';
			if (typeof params.exceptions[i] !== 'undefined') {
				day_kind = params.exceptions[i].kind;
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
		$(".task-hours table thead").append(row2);
		$(".task-hours table thead").append(row1);

		$(".task-hours .wrapper").animate({scrollLeft: 9999}, 0);
	}
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
