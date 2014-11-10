function init_projects_interface() {

	API.get.project(function(answer){
		var html = TEMPLATES.projects_list({items: answer.items});

		$(".projects-list").html(html);
	});

	/* кнопка добавления проекта. открывает диалог и оживляет его */
	$("#add-project-button").click(function(){
		/* отрисуем диалог */
		BootstrapDialog.confirm(TEMPLATES.project_full(), {
				title: "<h5>Добавить проект</h5>",
			}, function(result, dialogRef) {
				/* если пользователь нажал кнопку "добавить" - сабмитим форму */
				if (result) {
					var data = {};
					dialogRef.getModal().find('form').serializeArray().map(function(item) {
						data[item.name] = item.value;
					});

					// добавляем проект
					API.post.project(data, function(){
						// обновляем список проектов на экране
						API.get.project(function(answer){
							var html = TEMPLATES.projects_list({items: answer.items});

							$(".projects-list").html(html);
						});
					});

				}
			}
		);

		$("input[name='tagcolor']").colorpicker();
	});
}

$(document).ready(function() {
	/* projects */

	$("#content-wrapper").on('click', '.project-title', function() {
		var this_id = $(this).data("id");

		API.get.project({id: this_id}, function(answer){
			$(".main-wrapper").addClass("rpo");

			$("#description").html(TEMPLATES.project_full(answer.item));
		});
	});
});