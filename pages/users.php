<script>

$(document).ready(function() {

	API.get.user(function(answer){
		var html = TEMPLATES.users_list({items: answer.items});

		$("#content-wrapper").append(html);
	});
});


</script>