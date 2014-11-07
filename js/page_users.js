function init_users_interface() {
	API.get.user(function(answer){
		var html = TEMPLATES.users_list({items: answer.items});

		$("#content-wrapper").append(html);
	});

	$("#content-wrapper").on('click', "a[href='#add-user']", function(event){
		event.preventDefault();

		BootstrapDialog.confirm(TEMPLATES.user_add(), {title: "Добавление пользователя"}, function(result, dialogRef){
			if (result) {
				data = {};
				dialogRef.getModal().find('form').serializeArray().map(function(item) {
					data[item.name] = item.value;
				});

				API.post.user(data);
			}
		});
	});

	$("#content-wrapper").on('click', ".remove", function(){
		var userid = $(this).parent().data("id");
		BootstrapDialog.confirm(TEMPLATES.user_delete({"userid": userid}), {title: "Удаление"}, function(result, dialogRef){
			if (result) {
				data = {
					"deleted": 1
				};
				dialogRef.getModal().find('form').serializeArray().map(function(item) {
					data[item.name] = item.value;
				});

				API.put.user(data);
			}
		});
	});
}