var init_users_interface_done = false;
function init_users_interface() {

	var deleted = getParameterByName("deleted") || 0;

	API.get.user({"deleted": deleted}, function(answer){
		var html = TEMPLATES.users_list({items: answer.items});

		$("#content-wrapper").append(html);
	});

	if (init_users_interface_done)
		return;

	$("#content-wrapper").on('dblclick', '.user_card', function() {
		var this_id = $(this).data("id");
		API.get.user({id: this_id}, function(answer){
			BootstrapDialog.show({
				title: "<h5>Профиль</h5>",
				message: TEMPLATES.user_edit(answer.items[0])
			});
		});
	});

	$("#content-wrapper").on('click', "#add-user", function(event){
		event.preventDefault();

		BootstrapDialog.confirm(TEMPLATES.user_add(), {title: "Добавление пользователя"}, function(result, dialogRef){
			if (result) {
				data = {};
				dialogRef.getModal().find('form').serializeArray().map(function(item) {
					data[item.name] = item.value;
				});

				API.post.user(data, function() {
					$.growl("Пользователь добавлен!");
				});
			}
		});
	});

	$("#content-wrapper").on('click', ".remove_user", function(){
		var userid = $(this).data("id");
		var confirm = $(this).data("confirm");

		BootstrapDialog.confirm(confirm, {title: '<i class="fa fa-times-circle"></i>', type: "modal-alert"}, function(result, dialogRef){
			if (result) {
				data = {
					"deleted": 1
				};
				dialogRef.getModal().find('form').serializeArray().map(function(item) {
					data[item.name] = item.value;
				});

				API.put.user(data, function() {
					$.growl("Пользователь удалён!");
				});
			}
		});
	});

	init_users_interface_done = true;
}