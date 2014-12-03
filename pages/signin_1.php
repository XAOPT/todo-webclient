<body class="page-signin">

	<div id="page-signin-bg">
		<div class="overlay"></div>
		<img src="img/signin-bg-1.jpg" alt="">
	</div>

	<div class="signin-container">
		<!-- Левая часть -->
		<div class="signin-info">
			<span href="index.php" class="logo">
				<img src="img/logo-18x18.png" alt="" style="margin-top: -5px;">&nbsp;
				Админка
			</span>
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
			<div class="signin-text">
				<span>Войдите в аккаунт</span>
			</div>

			<div class='signin_error bg-danger'>hello world</div>

			<div class="form-group w-icon">
				<input type="text" name="signin_username" class="form-control input-lg" placeholder="Почта">
				<span class="fa fa-user signin-form-icon"></span>
			</div>

			<div class="form-group w-icon">
				<input type="password" name="signin_password" class="form-control input-lg" placeholder="Пароль">
				<span class="fa fa-lock signin-form-icon"></span>
			</div>

			<div class="form-actions">
				<input type="button" value="Войти" class="signin-submit signin-btn bg-primary">
				<a href="#" class="forgot-password" id="forgot-password-link">Забыли пароль?</a>
			</div>
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

</body>
</html>
