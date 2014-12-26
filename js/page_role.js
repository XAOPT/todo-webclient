function init_role_interface() {

	API.get.role(function(answer) {
		var html = TEMPLATES.role_list({items: answer.items});

		$(".role_list").replaceWith(html);
	});
}

$(document).ready(function() {

	// кнопка редактирования
	$("#content-wrapper").on('click', '.edit_role', function() {
		var this_id = $(this).data("id");
		API.get.role({id: this_id}, function(answer){
			BootstrapDialog.confirm(TEMPLATES.role_edit(answer.items[0]), {
				title: "<h5>Роль</h5>"
			}, function(result, dialogRef) {
				/* если пользователь нажал кнопку "добавить" - сабмитим форму */
				if (result) {
					var data = {
						id: this_id
					};
					dialogRef.getModal().find('form').serializeArray().map(function(item) {
						data[item.name] = item.value;
					});

					API.put.user(data, function() {
						$.growl("Роль отредактирована");
						init_role_interface();
					});
				}
			});
		});
	});

	// кнопка добавления пользователя
	$("#content-wrapper").on('click', "#add-role", function(event){
		event.preventDefault();

		BootstrapDialog.confirm(TEMPLATES.role_edit(), {title: "Добавление роли"}, function(result, dialogRef){
			if (result) {
				data = {};
				dialogRef.getModal().find('form').serializeArray().map(function(item) {
					data[item.name] = item.value;
				});

				API.post.role(data, function() {
					$.growl("Роль добавлена!");
					init_role_interface();
				});
			}
		});
	});

	// кнопка удаления роли
	$("#content-wrapper").on('click', ".remove_role", function(){
		var id = $(this).data("id");

		BootstrapDialog.confirm(confirm, {title: '<i class="fa fa-times-circle"></i>', type: "modal-alert"}, function(result, dialogRef){
			if (result) {
				API.delete.role({"id": id}, function() {
					$.growl("Группа удалена!");
					init_role_interface();
				});
			}
		});
	});
});