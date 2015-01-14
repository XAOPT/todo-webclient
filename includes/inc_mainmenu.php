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
				var a = $(this);

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

				$(".main-wrapper").removeClass("rpo");

				if (a.attr("href") !== "#") { // загружаем новую страницу только в том случае, если ссылка не пустая
					$("#main-menu li").removeClass("active");
					a.parent().addClass("active");

					a.parents(".mm-dropdown").addClass("open"); // откроем все родительские раскладывающиеся менюшки

					window.history.pushState({},"", a.attr("href"));
					$.ajax({
						type: 'get',
						url: window.location.hash.substring(1, window.location.hash.length),
						dataType: 'HTML',
						success: function(answer) {
							$("#content-wrapper").html(answer);
						}
					});
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

			$(".navigation a[href='"+window.location.hash+"']").click();
		}
	};
</script>

<div id="main-menu">
	<div>
		<div class="animated fadeIn" id="menu-content-info">
			<div class="hello-text">
				<span class="text-slim">Привет,</span>
				<span class="text-semibold"></span>
			</div>

			<img id="mainmenu_avatar" src="#" alt="">
		</div>
		<ul class="navigation">
			<li class="mm-dropdown">
				<a href="#"><i class="menu-icon fa fa-users"></i><span class="mm-text mmc-dropdown-delay fadeIn">Сотрудники</span></a>
				<ul class="mmc-dropdown-delay fadeInLeft">
					<li>
						<a href="#pages/users.php?deleted=0"><span class="mm-text">Активные</span></a>
					</li>
					<li>
						<a href="#pages/users.php?deleted=1"><span class="mm-text">Заблокированные</span></a>
					</li>
					<li>
						<a href="#pages/role.php"><span class="mm-text">Роли пользователей</span></a>
					</li>
				</ul>
			</li>
			<li>
				<a href="#pages/timesheet.php"><i class="menu-icon fa fa-table"></i><span class="mm-text mmc-dropdown-delay fadeIn">Timesheet</span></a>
			</li>
			<li class="mm-dropdown">
				<a href="#"><i class="menu-icon fa fa-sitemap"></i><span class="mm-text mmc-dropdown-delay fadeIn">Проекты</span></a>
				<ul class="mmc-dropdown-delay fadeInLeft">
					<li>
						<a href="#pages/projects.php?archived=0"><span class="mm-text">Активные</span></a>
					</li>
					<li>
						<a href="#pages/projects.php?archived=1"><span class="mm-text">Заблокированные</span></a>
					</li>
				</ul>
			</li>
			<li>
				<a href="#pages/report.php"><i class="menu-icon fa fa-calculator"></i><span class="mm-text mmc-dropdown-delay fadeIn">Отчёты</span></a>
			</li>
			<li>
				<a href="#pages/convert.php"><i class="menu-icon fa fa-exchange"></i><span class="mm-text mmc-dropdown-delay fadeIn">Конвертирование</span></a>
			</li>
			<!-- <li class="mm-dropdown">
				<a href="#"><i class="menu-icon fa fa-sitemap"></i><span class="mm-text mmc-dropdown-delay fadeIn">Уровни меню</span><span class="badge badge-primary">6</span></a>
				<ul class="mmc-dropdown-delay fadeInLeft">
					<li>
						<a href="#"><span class="mm-text">Уровень 1.1</span><span class="badge badge-danger">12</span><span class="label label-info">21</span></a>
					</li>
					<li>
						<a href="#"><span class="mm-text">Уровень 1.2</span></a>
					</li>
					<li class="mm-dropdown">
						<a href="#"><span class="mm-text">Уровень 1.3</span><span class="label label-warning">5</span></a>
						<ul>
							<li>
								<a href="#"><span class="mm-text">Уровень 2.1</span></a>
							</li>
							<li class="mm-dropdown">
								<a href="#"><span class="mm-text">Уровень 2.2</span></a>
								<ul>
									<li class="mm-dropdown">
										<a href="#"><span class="mm-text">Уровень 3.1</span></a>
										<ul>
											<li>
												<a href="#"><span class="mm-text">Уровень 4.1</span></a>
											</li>
										</ul>
									</li>
									<li>
										<a href="#"><span class="mm-text">Уровень 3.2</span></a>
									</li>
								</ul>
							</li>
							<li>
								<a href="#"><span class="mm-text">Уровень 2.2</span></a>
							</li>
						</ul>
					</li>
				</ul>
			</li> -->
		</ul>
	</div>
</div>
<div id="main-menu-bg"></div>