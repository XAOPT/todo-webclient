<head>
	<meta http-equiv="X-UA-Compatible" content="IE=10; IE=9; IE=8; IE=7; IE=EDGE" />

	<link rel="stylesheet" href="css/bootstrap.min.css">
	<link rel="stylesheet" href="css/font-awesome.min.css">
	<link rel="stylesheet/less" href="css/menu.less">
	<link rel="stylesheet/less" href="css/content_wrapper.less">
	<link rel="stylesheet/less" href="css/timesheet.less">

	<script src="js/jquery-2.1.1.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<script src="js/less.min.js"></script>
	<script src="http://cdnjs.cloudflare.com/ajax/libs/floatthead/1.2.8/jquery.floatThead.js"></script>

	<link href="http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&subset=latin" rel="stylesheet" type="text/css">

	<script>
		var mainMenu = {
			submenu_locker: false,
			hide_submenu: function() {
				setTimeout(function(){
					if (!mainMenu.submenu_locker)
						$(".mmc-dropdown-open-ul").remove();
				},1000);
			},
			init: function() {
				$("#main-menu").on("click", "a", function(){
					if ($("BODY").hasClass("mmc"))
						return false;

					var LI = $(this).parent();

					LI.siblings("LI").not(LI).each(function(){
						$(this).find("UL:first").slideUp("fast", function(){$(this).removeClass("open")}.bind($(this)));
					});

					if (LI.hasClass("open")) {
						LI.find("UL:first").slideUp("fast", function(){LI.removeClass("open")});
					}
					else {
						LI.find("UL:first").slideDown("fast", function(){LI.addClass("open"); LI.find("UL:first").removeAttr('style');})
					}

					return false;
				});

				$("#main-menu").on({
					mouseenter: function() {
						mainMenu.submenu_locker = true;
					},
					mouseleave: function() {
						mainMenu.submenu_locker = false;
						mainMenu.hide_submenu();
					}
				}, ".mmc-dropdown-open-ul");

				$("LI.mm-dropdown").hover(
					function(){
						mainMenu.submenu_locker = true;

						$(".mmc-dropdown-open-ul").remove();

						var head = $(this).find(".mm-text:first").clone();
						$(this).find("UL:first").clone().removeClass("fadeInLeft").addClass("mmc-dropdown-open-ul").css({"top": $(this).position().top}).appendTo("#main-menu").prepend(head.addClass('mmc-title'));

					},
					function(){
						mainMenu.submenu_locker = false;
						mainMenu.hide_submenu();
					}
				);


			}
		};

		$(document).ready(function(){
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
		});
	</script>
</head>