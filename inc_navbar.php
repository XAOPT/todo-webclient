<div id="main-navbar" class="navbar" role="navigation">
	<!-- Main menu toggle -->
	<button type="button" id="main-menu-toggle"><i class="navbar-icon fa fa-bars icon toogleMenu"></i></button>

	<div class="navbar-inner">
		<!-- Main navbar header -->
		<div class="navbar-header">

			<!-- Logo -->
			<a href="index.php" class="navbar-brand">
				<div><img src="img/logo-18x18.png"></div>
				Тестовый сервер
			</a>

		</div> <!-- / .navbar-header -->

		<div id="main-navbar-collapse" class="collapse navbar-collapse main-navbar-collapse">
			<div>
				<ul class="nav navbar-nav">
					<li>
						<a href="#">Главная</a>
					</li>
					<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown</a>
						<ul class="dropdown-menu">
							<li><a href="#">Первый пункт</a></li>
							<li><a href="#">Второй</a></li>
							<li class="divider"></li>
							<li><a href="#">Третий пункт меню</a></li>
						</ul>
					</li>
				</ul> <!-- / .navbar-nav -->

				<div class="right clearfix">
					<ul class="nav navbar-nav pull-right right-navbar-nav">

						<li class="nav-icon-btn nav-icon-btn-danger dropdown">
							<a href="#notifications" class="dropdown-toggle" data-toggle="dropdown">
								<span class="label">5</span>
								<i class="nav-icon fa fa-bullhorn"></i>
								<span class="small-screen-text">Notifications</span>
							</a>

							<!-- NOTIFICATIONS -->

							<div class="dropdown-menu widget-notifications no-padding" style="width: 300px">
								<div class="slimScrollDiv" style="position: relative; overflow: hidden; width: auto; height: 250px;"><div class="notifications-list" id="main-navbar-notifications" style="overflow: hidden; width: auto; height: 250px;">

									<div class="notification">
										<div class="notification-title text-danger">SYSTEM</div>
										<div class="notification-description"><strong>Error 500</strong>: Syntax error in index.php at line <strong>461</strong>.</div>
										<div class="notification-ago">12h ago</div>
										<div class="notification-icon fa fa-hdd-o bg-danger"></div>
									</div> <!-- / .notification -->

									<div class="notification">
										<div class="notification-title text-info">STORE</div>
										<div class="notification-description">You have <strong>9</strong> new orders.</div>
										<div class="notification-ago">12h ago</div>
										<div class="notification-icon fa fa-truck bg-info"></div>
									</div> <!-- / .notification -->

									<div class="notification">
										<div class="notification-title text-default">CRON DAEMON</div>
										<div class="notification-description">Job <strong>"Clean DB"</strong> has been completed.</div>
										<div class="notification-ago">12h ago</div>
										<div class="notification-icon fa fa-clock-o bg-default"></div>
									</div> <!-- / .notification -->

									<div class="notification">
										<div class="notification-title text-success">SYSTEM</div>
										<div class="notification-description">Server <strong>up</strong>.</div>
										<div class="notification-ago">12h ago</div>
										<div class="notification-icon fa fa-hdd-o bg-success"></div>
									</div> <!-- / .notification -->

									<div class="notification">
										<div class="notification-title text-warning">SYSTEM</div>
										<div class="notification-description"><strong>Warning</strong>: Processor load <strong>92%</strong>.</div>
										<div class="notification-ago">12h ago</div>
										<div class="notification-icon fa fa-hdd-o bg-warning"></div>
									</div> <!-- / .notification -->

								</div><div class="slimScrollBar" style="width: 7px; position: absolute; top: 0px; opacity: 0.4; display: block; border-top-left-radius: 7px; border-top-right-radius: 7px; border-bottom-right-radius: 7px; border-bottom-left-radius: 7px; z-index: 99; right: 1px; background: rgb(0, 0, 0);"></div><div class="slimScrollRail" style="width: 7px; height: 100%; position: absolute; top: 0px; display: none; border-top-left-radius: 7px; border-top-right-radius: 7px; border-bottom-right-radius: 7px; border-bottom-left-radius: 7px; opacity: 0.2; z-index: 90; right: 1px; background: rgb(51, 51, 51);"></div></div> <!-- / .notifications-list -->
								<a href="#" class="notifications-link">MORE NOTIFICATIONS</a>
							</div> <!-- / .dropdown-menu -->
						</li>
						<li class="nav-icon-btn nav-icon-btn-success dropdown">
							<a href="#messages" class="dropdown-toggle" data-toggle="dropdown">
								<span class="label">10</span>
								<i class="nav-icon fa fa-envelope"></i>
								<span class="small-screen-text">Income messages</span>
							</a>

							<!-- MESSAGES -->

							<div class="dropdown-menu widget-messages-alt no-padding" style="width: 300px;">
								<div class="slimScrollDiv" style="position: relative; overflow: hidden; width: auto; height: 250px;"><div class="messages-list" id="main-navbar-messages" style="overflow: hidden; width: auto; height: 250px;">

									<div class="message">
										<img src="assets/demo/avatars/2.jpg" alt="" class="message-avatar">
										<a href="#" class="message-subject">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</a>
										<div class="message-description">
											from <a href="#">Robert Jang</a>
											&nbsp;&nbsp;·&nbsp;&nbsp;
											2h ago
										</div>
									</div> <!-- / .message -->

									<div class="message">
										<img src="assets/demo/avatars/3.jpg" alt="" class="message-avatar">
										<a href="#" class="message-subject">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</a>
										<div class="message-description">
											from <a href="#">Michelle Bortz</a>
											&nbsp;&nbsp;·&nbsp;&nbsp;
											2h ago
										</div>
									</div> <!-- / .message -->

								</div><div class="slimScrollBar" style="width: 7px; position: absolute; top: 0px; opacity: 0.4; display: block; border-top-left-radius: 7px; border-top-right-radius: 7px; border-bottom-right-radius: 7px; border-bottom-left-radius: 7px; z-index: 99; right: 1px; background: rgb(0, 0, 0);"></div><div class="slimScrollRail" style="width: 7px; height: 100%; position: absolute; top: 0px; display: none; border-top-left-radius: 7px; border-top-right-radius: 7px; border-bottom-right-radius: 7px; border-bottom-left-radius: 7px; opacity: 0.2; z-index: 90; right: 1px; background: rgb(51, 51, 51);"></div></div> <!-- / .messages-list -->
								<a href="#" class="messages-link">MORE MESSAGES</a>
							</div> <!-- / .dropdown-menu -->
						</li>


						<li>
							<form class="navbar-form pull-left">
								<input type="text" class="form-control" placeholder="Поиск">
							</form>
						</li>

						<li class="dropdown">
							<a href="#" class="dropdown-toggle user-menu" data-toggle="dropdown">
								<img src="img/avatar1.jpg" alt="">
								<span>Divo Manager</span>
							</a>
							<ul class="dropdown-menu">
								<li><a href="#" class="profileDialog">Профиль</a></li>
								<li><a href="#">Аккаунт</a></li>
								<li><a href="#"><i class="dropdown-icon fa fa-cog"></i>&nbsp;&nbsp;Настройки</a></li>
								<li class="divider"></li>
								<li><a href="pages-signin.php"><i class="dropdown-icon fa fa-power-off"></i>&nbsp;&nbsp;Выход</a></li>
							</ul>
						</li>
					</ul> <!-- / .navbar-nav -->
				</div> <!-- / .right -->
			</div>
		</div> <!-- / #main-navbar-collapse -->
	</div> <!-- / .navbar-inner -->
</div>

<script>
$(document).ready(function(){
	BootstrapDialog.prototype.updateAnimate = function(){return;};

	$(".profileDialog").click(function(){
   		BootstrapDialog.show({
   			title: "<h5>Профиль</h5>",
            message: $('<div></div>').load('profile.php')
        });
	});
});
</script>