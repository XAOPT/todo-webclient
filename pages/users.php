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