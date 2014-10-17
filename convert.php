<script>

$(document).ready(function() {
	$("#content-wrapper").on('click', '.convert_users', function() {
		API.get.convert.users(function(answer){
			BootstrapDialog.show({
				message: "OK"
			});
		});
	});
});
</script>

<div class='convert_users'>Пользователи</div>