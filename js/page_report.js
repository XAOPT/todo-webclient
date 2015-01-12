function init_report_interface() {
	build_report_filter();
}


function build_report_filter()
{
	API.get.user({deleted: 0}, function(answer){
		var tpl_data = {
			users: answer.items
		};

		API.get.project({archived: 0}, function(answer) {
			tpl_data.projects = answer.items;

			$(".report-body").html(TEMPLATES.report_filter(tpl_data));

			$('.datepicker').datepicker({
			    minViewMode: 1
			});
		})
	});
}

$(document).ready(function(){
	$(document).on('click', '#build_report', function(){
		var filter_users = [];
		var filter_projects = [];

		$(".report_filter_users input:checked").each(function() {
			filter_users.push(this.value);
		});

		$(".report_filter_projects input:checked").each(function() {
			filter_projects.push(this.value);
		});

		var dt = $('.datepicker').datepicker('getDate');
		var start = new Date(dt);
		var filter_from = Math.ceil(start.getTime()/86400000);

		if (start.getMonth() == 11) {
		    var filter_count = Math.ceil(new Date(start.getFullYear() + 1, 0, 1).getTime()/86400000) - filter_from;
		} else {
		    var filter_count = Math.ceil(new Date(start.getFullYear(), start.getMonth() + 1, 1).getTime()/86400000) - filter_from;
		}

		API.get.user({id: filter_users}, function(answer){
			users = answer.items;

			API.get.project({id: filter_projects}, function(answer) {
				var projects = answer.items;
				var projects_id = answer.items.map(function(i){return i.id;});

				$(".report-body").html(TEMPLATES.report_table_head({"projects": projects}));

				$('span').tooltip();

				for (var i=0; i<users.length; i++) {

					(function(i){
						var hours = [];
						API.get.timesheet({userid: users[i].id, projid: projects_id, from: filter_from, count: filter_count}, function(answer){
							answer.items.forEach(function(item){
								if (typeof hours[item.project] !== 'undefined')
									hours[item.project] += item.worktimeSeconds/3600;
								else {
									hours[item.project] = item.worktimeSeconds/3600;
								}
							});

							var sorted_hours = [];
							var total = 0;

							projects.forEach(function(proj){
								var temp = (typeof hours[proj.id] === 'undefined')?0:Math.round(hours[proj.id]*10)/10;
								sorted_hours.push(temp);
								total += temp;
							});

							$(".report-body TABLE TBODY").append(TEMPLATES.report_table_row({user: users[i], "sorted_hours": sorted_hours, "total": total}));
						});
					})(i);
				}
			})
		});
	});
});