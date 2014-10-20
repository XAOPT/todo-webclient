<script>

$(document).ready(function() {

	API.get.project(function(answer){
		console.log(answer);
		var html = TEMPLATES.projects_list({items: answer.items});

		$(".projects-list").append(html);
	});
});


</script>

<div class="page-header">
	<h1>Projects</h1>
</div>

<div id="projects" class="row">
	<div class="projects-list col-md-2"></div>
	<div class="project-description col-md-10">456</div>
</div>