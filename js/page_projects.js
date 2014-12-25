function init_projects_interface() {

	var archived = getParameterByName("archived") || 0;

	refreshProjectList({"archived": archived});
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

/* этот блок выполняется один раз при запуске тудушника */
$(document).ready(function() {

	/* нажатие на кнопку редактирования проекта */
	$("#content-wrapper").on('click', '.project-edit', function() {

		$("input[name='tagcolor']").colorpicker();

		var this_id = $(this).data("id");

		API.get.project({id: this_id}, function(answer){

			/* отрисуем диалог */
			BootstrapDialog.confirm(TEMPLATES.project_full(answer.items[0]), {
					title: "<h5>Редактировать проект</h5>",
				}, function(result, dialogRef) {
					/* если пользователь нажал кнопку "добавить" - сабмитим форму */
					if (result) {
						var data = {};
						dialogRef.getModal().find('form').serializeArray().map(function(item) {
							data[item.name] = item.value;
						});

						// добавляем проект
						API.put.project(data, function(answer) {
							$.growl("Проект отредактирован!");

							// обновляем список проектов на экране
							init_projects_interface();
						});
					}
				}
			);

			$("input[name='tagcolor']").colorpicker({format: 'hex'});
		});
	});

	/* кнопка архивирования/разархивирования проекта */
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

	/* кнопка добавления проекта. открывает диалог и оживляет его */
	$("#content-wrapper").on('click', "#add-project-button", function(){
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
						init_projects_interface();
					});
				}
			}
		);

		$("input[name='tagcolor']").colorpicker({format: 'hex'});
	});
});