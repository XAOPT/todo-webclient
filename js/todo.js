
$(document).ready(function() {

	for (var prop in TEMPLATES)
	{
		TEMPLATES[prop] = doT.template(TEMPLATES[prop]);
	}


	BootstrapDialog.prototype.updateAnimate = function(){return;};


	/*left navigation */
	mainMenu.init();

	$(".toogleMenu").click(function(){
		$("BODY").toggleClass("mmc");
	});

	$( window ).resize(function() {
		var windowWidth = $( window ).width();

		if (windowWidth < 840) {
			$("BODY").addClass("mmc");
		}
	});

	$("#main-menu").on('click', "a", function(){
		var a = $(this);
		$.ajax({
			type: 'get',
			url: a.attr("href"),
			dataType: 'HTML',
			success: function(answer) {
				$("#content-wrapper").html(answer);
				window.history.pushState({},"", '#'+a.attr("href"));
			}
		});
	});


	/* top navigation */
	$(".profileDialog").click(function(){
		BootstrapDialog.show({
			title: "<h5>Профиль</h5>",
			message: $('<div></div>').load('profile.php')
		});
	});

	/* users */
	$("#content-wrapper").on('dblclick', '.user_card', function() {
		var this_id = $(this).data("id");
		API.get.user({id: this_id}, function(answer){
			BootstrapDialog.show({
				title: "<h5>Профиль</h5>",
				message: TEMPLATES.user_edit(answer.items[0])
			});
		});
	});

	/* projects */

	$("#content-wrapper").on('click', '.project-title', function() {
		var this_id = $(this).data("id");
		API.get.project({id: this_id}, function(answer){
			console.log(answer);
			$('.project-description').html(TEMPLATES.project_edit(answer.items[0]));
		});
	});

	/* convert.php */

	$("#content-wrapper").on('click', '.convert_users', function() {
		API.get.convert.users(function(answer){
			BootstrapDialog.show({
				message: "OK"
			});
		});
	});

	$("#content-wrapper").on('click', '.convert_projects', function() {
		API.get.convert.projects(function(answer){
			BootstrapDialog.show({
				message: "OK"
			});
		});
	});
});

