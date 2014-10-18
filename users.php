<script>
$(document).ready(function() {

	API.get.user(function(answer){
		var html = TEMPLATES.users_list({users: answer.items});

		$("#content-wrapper").append(html);
	});

	$("#content-wrapper").on('dblclick', '.user_card', function() {
		var this_id = $(this).data("id");
		API.get.user({id: this_id}, function(answer){
			BootstrapDialog.show({
				title: "<h5>Профиль</h5>",
				message: TEMPLATES.user_edit(answer.items[0])
			});
		});
	});
});
</script>
