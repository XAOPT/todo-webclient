function init_users_groups_interface() {
	/*API.get.user_group(function(answer) {
		$(".groups_list").html(TEMPLATES.user_group({items: answer.items}));
	});*/
}

$(document).ready(function() {

	// кнопка редактирования группы
	$("#content-wrapper").on('click', '.edit_role', function() {
		var this_id = $(this).data("id");

		API.get.role({id: this_id}, function(answer){

			// переварим ответ от API и сделаем его удобным для шаблонизатора
			for (var i=0; i<answer.items[0].permissions.length; i++) {
				answer.items[0].permissions[answer.items[0].permissions[i]] = true;
			}

			BootstrapDialog.confirm(TEMPLATES.role_edit(answer.items[0]), {
				title: "<h5>Роль</h5>"
			}, function(result, dialogRef) {
				/* если пользователь нажал кнопку "добавить" - сабмитим форму */
				if (result) {
					var data = {
						id: this_id,
						'permissions': []
					};
					dialogRef.getModal().find('form').serializeArray().map(function(item) {
						if (item.name == 'permissions')
							data['permissions'].push(item.value);
						else
							data[item.name] = item.value;
					});

					API.put.role(data, function() {
						$.growl("Роль отредактирована");
						init_role_interface();
					});
				}
			});
		});
	});

	// кнопка добавления группы
	$("#content-wrapper").on('click', "#add-role", function(event){
		event.preventDefault();

		BootstrapDialog.confirm(TEMPLATES.role_edit(), {title: "Добавление роли"}, function(result, dialogRef){
			if (result) {
				data = {
					'permissions': []
				};
				dialogRef.getModal().find('form').serializeArray().map(function(item) {
					if (item.name == 'permissions')
						data['permissions'].push(item.value);
					else
						data[item.name] = item.value;
				});

				API.post.role(data, function() {
					$.growl("Роль добавлена!");
					init_role_interface();
				});
			}
		});
	});

	// кнопка удаления группы
	$("#content-wrapper").on('click', ".remove_role", function(){
		var id = $(this).data("id");
		var confirm = $(this).data("confirm");

		BootstrapDialog.confirm(confirm, {title: '<i class="fa fa-times-circle"></i>', type: "modal-alert"}, function(result, dialogRef){
			if (result) {
				API.delete.user_group({"id": id}, function() {
					$.growl("Группа удалена!");
					init_users_groups_interface();
				});
			}
		});
	});
});