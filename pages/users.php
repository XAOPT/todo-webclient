<script>

$(document).ready(function() {

	API.get.user(function(answer){
		var html = TEMPLATES.users_list({items: answer.items});

		$("#content-wrapper").append(html);
	});
});


</script>

<div class="page-header">
	<h1>Пользователи</h1>
</div>

<div class="page-header-menu">
	<button class="btn btn-flat btn-sm btn-labeled btn-success"><span class="btn-label icon fa fa-camera-retro"></span>Actions</button>
	<button class="btn btn-flat btn-xs btn-labeled btn-danger"><span class="btn-label icon fa fa-camera-retro"></span>Extra small</button>
	<button class="btn btn-flat btn-labeled btn-primary"><span class="btn-label icon fa fa-camera-retro"></span>Default</button>
</div>