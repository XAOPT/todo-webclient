<html>

<?php
if ($_SERVER['REMOTE_ADDR'] == '127.0.0.1') {
	include("includes/config_development.php");
}
else {
	include("includes/config_production.php");
}
?>

<script>
var API_DOMAIN = "<?=API_DOMAIN?>";
</script>

<?php
if (isset($_COOKIE['session_token']) && isset($_COOKIE['session_user']))
{
	echo "
	<script>
		var SESSION_KEY = '{$_COOKIE['session_token']}';
		var SESSION_USER = '{$_COOKIE['session_user']}';
	</script>
	";
}
else {
	include("includes/inc_signin_head.php");
	include("pages/signin_1.php");
	exit;
}
?>

<?php include("includes/inc_head.php");?>

<body class='main-wrapper rpo'>

	<?php include("includes/inc_navbar.php");?>

	<?php include("includes/inc_mainmenu.php");?>


	<div id="content-wrapper">
<pre>
TODO:

НОТ! Авторизация!

Задачи:
1. Отображение в виде дерева

Проекты:
1. Редактирование проекта

Общее:
1. Разграничение уровней доступа
2. Сделат ьсистему более мощного кеширования АПИ, учитывающее параметры запроса
</pre>
	</div>


</body>

</html>