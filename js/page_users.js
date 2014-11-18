function init_users_interface() {

	var deleted = getParameterByName("deleted") || 0;
	var pages_cnt;

	API.get.user({"deleted": deleted}, function(answer){
		pages_cnt = Math.ceil(answer.items.length / 20 );

		pages_cnt = (pages_cnt > 0)?new Array(pages_cnt):[];

		answer.items = answer.items.slice(0,20);

		var html = TEMPLATES.users_list({items: answer.items, pages: pages_cnt, active_page: 0});

		$("#content-wrapper").append(html);
	});
}

$(document).ready(function() {
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
		var id = $(this).data("id");
		var confirm = $(this).data("confirm");

		BootstrapDialog.confirm(confirm, {title: '<i class="fa fa-times-circle"></i>', type: "modal-alert"}, function(result, dialogRef){
			if (result) {
				data = {
					"deleted": 1,
					"id": 1
				};

				API.put.user(data, function() {
					$.growl("Пользователь удалён!");
				});
			}
		});
	});

	$("#content-wrapper").on('click', ".user-pagination A", function() {
		event.preventDefault();

		var page = $(this).data("page");

		var deleted = getParameterByName("deleted") || 0;

		API.get.user({"deleted": deleted, from: 20*page, count: 20}, function(answer){
			var html = TEMPLATES.users_list({items: answer.items, pages: pages_cnt, active_page: page});

			$(".user_list").replaceWith(html);
		});
	});
});