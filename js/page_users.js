var user_pages_cnt = -1;
var current_page = 0;
function init_users_interface(flash_setting) {

	if (typeof flash_setting !== 'undefined' && flash_setting) {
		user_pages_cnt = -1;
		current_page = 0;
	}

	var deleted = getParameterByName("deleted") || 0;

	// если это первое открытие страницы пользователей за время сессии - надо подгрузить всех, посчитать их количество и всё такое
	if (user_pages_cnt == -1)
		var options = {"deleted": deleted};
	else
		var options = {"deleted": deleted, from: 20*current_page, count: 20};

	API.get.user(options, function(answer) {

		// если это первое открытие страницы пользователей за время сессии
		if (user_pages_cnt == -1) {

			user_pages_cnt = Math.ceil(answer.items.length / 20 );

			user_pages_cnt = (user_pages_cnt > 0)?new Array(user_pages_cnt):[];

			answer.items = answer.items.slice(0,20);
		}

		var html = TEMPLATES.users_list({items: answer.items, pages: user_pages_cnt, active_page: current_page});

		$(".user_list").replaceWith(html);
	});
}

$(document).ready(function() {

	// кнопка редактирования пользователя
	$("#content-wrapper").on('click', '.edit_user', function() {
		var this_id = $(this).data("id");
		API.get.user({id: this_id}, function(answer){
			BootstrapDialog.confirm(TEMPLATES.user_edit(answer.items[0]), {
				title: "<h5>Профиль</h5>"
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
						$.growl("Пользователь отредактирован");
						init_users_interface();
					});
				}
			});
		});
	});

	// кнопка добавления пользователя
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
					init_users_interface();
				});
			}
		});
	});

	// кнопка блокировки пользователя
	$("#content-wrapper").on('click', ".remove_user", function(){
		var id = $(this).data("id");
		var deleted = $(this).data("deleted");
		var confirm = $(this).data("confirm");

		BootstrapDialog.confirm(confirm, {title: '<i class="fa fa-times-circle"></i>', type: "modal-alert"}, function(result, dialogRef){
			if (result) {
				data = {
					"deleted": deleted?0:1,
					"id": id
				};

				API.put.user(data, function() {
					$.growl(deleted?"Пользователь разблочен!":"Пользователь заблочен!");
					init_users_interface();
				});
			}
		});
	});

	// пагинация
	$("#content-wrapper").on('click', ".user-pagination A", function() {
		event.preventDefault();

		current_page = $(this).data("page");

		init_users_interface();
	});
});