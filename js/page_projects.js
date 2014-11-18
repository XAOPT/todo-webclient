function init_projects_interface() {

	var archived = getParameterByName("archived") || 0;

	refreshProjectList({"archived": archived});

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
					API.post.project(data, function(answer) {
						$.growl("Проект добавлен!");

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

function refreshProjectList(params) {
	if (typeof params === 'undefined') {
		params = {};
	}

	API.get.project(params, function(answer){
		var html = TEMPLATES.projects_list({items: answer.items});

		if ($(".project_list").get().length)
			$(".project_list").replaceWith(html);
		else
			$("#content-wrapper").append(html);
	});
}

$(document).ready(function() {
	/* projects */

	$("#content-wrapper").on('click', '.project-edit', function() {
		var this_id = $(this).data("id");

		API.get.project({id: this_id}, function(answer){
			$(".main-wrapper").addClass("rpo");

			console.log(123, answer);
			$("#description").html(TEMPLATES.project_full(answer.item));
		});
	});

	$("#content-wrapper").on('click', ".archivate_project", function(){
		var id = $(this).data("id");
		var confirm = $(this).data("confirm");
		var archived = $(this).data("archived");

		BootstrapDialog.confirm(confirm, {title: '<i class="fa fa-times-circle"></i>', type: "modal-alert"}, function(result, dialogRef){
			if (result) {
				data = {
					"archived": archived,
					"id": id
				};

				API.put.project(data, function() {
					$.growl("Проект перемещён!");
					refreshProjectList({"archived": archived?0:1});
				});
			}
		});
	});
});