<?php include("../includes/inc_signin_head.php"); ?>

<body class="page-signin">

	<div id="page-signin-bg">
		<div class="overlay"></div>
		<img src="../img/signin-bg-1.jpg" alt="">
	</div>

	<div class="signin-container">
		<!-- Левая часть -->
		<div class="signin-info">
			<a href="index.php" class="logo">
				<img src="../img/logo-18x18.png" alt="" style="margin-top: -5px;">&nbsp;
				Админка
			</a>
			<div class="slogan">
				Просто. Гибко. Удобно.
			</div>
			<ul>
				<li><i class="fa fa-sitemap signin-icon"></i> Модульная структура</li>
				<li><i class="fa fa-file-text-o signin-icon"></i> Удобные исходные файлы</li>
				<li><i class="fa fa-outdent signin-icon"></i> Любые устройства</li>
				<li><i class="fa fa-heart signin-icon"></i> Сделано с любовью</li>
			</ul>
		</div>

		<!-- Правая часть -->
		<div class="signin-form">

			<!-- Форма -->
			<form action="index.php" id="signin-form_id">
				<div class="signin-text">
					<span>Войдите в аккаунт</span>
				</div>

				<div class="form-group w-icon">
					<input type="text" name="signin_username" id="username_id" class="form-control input-lg" placeholder="Почта">
					<span class="fa fa-user signin-form-icon"></span>
				</div>

				<div class="form-group w-icon">
					<input type="password" name="signin_password" id="password_id" class="form-control input-lg" placeholder="Пароль">
					<span class="fa fa-lock signin-form-icon"></span>
				</div>

				<div class="form-actions">
					<input type="submit" value="Войти" class="signin-btn bg-primary">
					<a href="#" class="forgot-password" id="forgot-password-link">Забыли пароль?</a>
				</div>
			</form>
			<!-- / Форма -->

			<div class="signin-with">
				<!-- Facebook -->
				<a class="signin-with-btn" onclick="fb_login();">Войти через <span>Facebook</span></a>
			</div>

			<!-- Восстановление пароля -->
			<div class="password-reset-form" id="password-reset-form">
				<div class="header">
					<div class="signin-text">
						<span>Восстановление пароля</span>
						<div class="close">&times;</div>
					</div>
				</div>

				<!-- Форма -->
				<form action="index.php" id="password-reset-form_id">
					<div class="form-group w-icon">
						<input type="text" name="password_reset_email" id="p_email_id" class="form-control input-lg" placeholder="Укажите свой email">
						<span class="fa fa-envelope signin-form-icon"></span>
					</div>

					<div class="form-actions">
						<input type="submit" value="Отправить инструкции" class="signin-btn bg-primary">
					</div>
				</form>
				<!-- / Форма -->
			</div>
			<!-- / Восстановление пароля -->
		</div>
	</div>

	<div class="not-a-member">
		Нет доступа? <a href="#">Отправьте заявку</a>
	</div>

<script type="text/javascript">
	$(document).ready(function(){
		// Изменение размера фоновой картинки
		// пока картинки не хватает по ширине - масштабируем по ширине, когда начинает нехватать по высоте - по высоте
		var $ph  = $('#page-signin-bg'),
				$img = $ph.find('> img');

		function resize_bg() {
			$img.attr('style', '');
			if ($img.height() < $ph.height()) {
				$img.css({
					height: '100%',
					width: 'auto'
				});
			}
		}

		resize_bg();

		$(window).on('resize', resize_bg);

		// Скрываем/показываем форму восстановления пароля
		$('#forgot-password-link').click(function () {
			$('#password-reset-form').fadeIn(400);
			return false;
		});
		$('#password-reset-form .close').click(function () {
			$('#password-reset-form').fadeOut(400);
			return false;
		});
	});
</script>

<script>
	function fb_login() {
		FB.login(function(response) {
			statusChangeCallback(response);
		}, {scope: 'public_profile,email'});
	}

	// This is called with the results from from FB.getLoginStatus().
	function statusChangeCallback(response) {
		console.log('statusChangeCallback', response);

		if (response.status === 'connected') {
			var data = {
				accessToken: response.authResponse.accessToken,
				signedRequest: response.authResponse.signedRequest
			}

			data = JSON.stringify(data);

			$.ajax({
				type: "POST",
				url: "<?=$api_server?>auth/fb/",
				data: data,
				async: false,
				dataType: 'JSON',
				success: function(answer) {
					console.log("/auth/", answer);
				},
				error: function(error) {
					FB.logout();
				}
			});
		} else if (response.status === 'not_authorized') {
			// The person is logged into Facebook, but not your app.
		} else {
			// The person is not logged into Facebook, so we're not sure if
			// they are logged into this app or not.
		}
	}

	window.fbAsyncInit = function() {
		FB.init({
			appId   : '391488224350326',
			xfbml   : true,  // parse social plugins on this page
			version : 'v2.2'
		});

		FB.getLoginStatus(function(response) {
			statusChangeCallback(response);
		});
	};

	// Load the SDK asynchronously
	(function(d, s, id){
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) {return;}
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
</script>

</body>
</html>
