<script>

$(document).ready(function() {

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
});


</script>

<div class="page-header">
	<h1>Пользователи</h1>
</div>

<div class="page-header-menu">
	<div class="dropdown">
		<button class="btn btn-flat btn-sm btn-labeled btn-success" data-toggle="dropdown"><span class="btn-label icon fa fa-laptop"></span>Действия</button>

		<ul class="dropdown-menu pull-right">
			<li><a href="#add-user"><span class="fa fa-plus"></span> Добавить пользователя</a></li>
		</ul>
	</div>
	<!-- <button class="btn btn-flat btn-xs btn-labeled btn-danger"><span class="btn-label icon fa fa-camera-retro"></span>Extra small</button>
	<button class="btn btn-flat btn-labeled btn-primary"><span class="btn-label icon fa fa-camera-retro"></span>Default</button> -->
</div>
