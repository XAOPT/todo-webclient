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
</script>

<div id="main-menu">
	<div>
		<div class="animated fadeIn" id="menu-content-info">
			<div class="hello-text">
				<span class="text-slim">Привет,</span>
				<span class="text-semibold">Manager</span>
			</div>

			<img src="img/avatar1.jpg" alt="">
		</div>
		<ul class="navigation">
			<li>
				<a href="pages/users.php"><i class="menu-icon fa fa-users"></i><span class="mm-text mmc-dropdown-delay fadeIn">Сотрудники</span></a>
			</li>
			<li>
				<a href="pages/timesheet.php"><i class="menu-icon fa fa-table"></i><span class="mm-text mmc-dropdown-delay fadeIn">Timesheet</span></a>
			</li>
			<li>
				<a href="pages/projects.php"><i class="menu-icon fa fa-sitemap"></i><span class="mm-text mmc-dropdown-delay fadeIn">Проекты</span></a>
			</li>
			<li>
				<a href="pages/convert.php"><i class="menu-icon fa fa-exchange"></i><span class="mm-text mmc-dropdown-delay fadeIn">Конвертирование</span></a>
			</li>
			<li>
				<a href="#"><i class="menu-icon fa fa-tasks"></i><span class="mm-text mmc-dropdown-delay fadeIn">Статистика</span></a>
			</li>
			<li class="mm-dropdown open active">
				<a href="#"><i class="menu-icon fa fa-desktop"></i><span class="mm-text mmc-dropdown-delay fadeIn">Интерфейс</span></a>
				<ul class="mmc-dropdown-delay fadeInLeft">
					<li>
						<a href="#"><span class="mm-text">Кнопки</span></a>
					</li>
					<li>
						<a href="#"><span class="mm-text">Закладки</span></a>
					</li>
					<li>
						<a href="#"><span class="mm-text">Диалоги</span></a>
					</li>
					<li class=" active">
						<a href="#"><span class="mm-text">Иконки</span></a>
					</li>
				</ul>
			</li>
			<li class="mm-dropdown">
				<a href="#"><i class="menu-icon fa fa-check-square"></i><span class="mm-text mmc-dropdown-delay fadeIn">Элементы форм</span></a>
				<ul class="mmc-dropdown-delay fadeInLeft">
					<li>
						<a href="#"><span class="mm-text">Основное</span></a>
					</li>
					<li>
						<a href="#"><span class="mm-text">Пиккеры</span></a>
					</li>
					<li>
						<a href="#"><span class="mm-text">Редакторы</span></a>
					</li>
				</ul>
			</li>
			<li>
				<a href="#"><i class="menu-icon fa fa-bar-chart-o"></i><span class="mm-text mmc-dropdown-delay fadeIn">Графики</span></a>
			</li>
			<li class="mm-dropdown">
				<a href="#"><i class="menu-icon fa fa-files-o"></i><span class="mm-text mmc-dropdown-delay fadeIn">Страницы</span><span class="label label-success">16</span></a>
				<ul class="mmc-dropdown-delay fadeInLeft">
					<li>
						<a href="#"><span class="mm-text">Результат поиска</span></a>
					</li>
					<li>
						<a href="#"><span class="mm-text">Авторизация</span></a>
					</li>
					<li>
						<a href="#"><span class="mm-text">FAQ</span></a>
					</li>
				</ul>
			</li>
			<li class="mm-dropdown">
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
			</li>
		</ul> <!-- / .navigation -->
	</div>
</div>
<div id="main-menu-bg"></div>