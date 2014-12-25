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
if (isset($_COOKIE['session_token']) && isset($_COOKIE['session_user']) && !empty($_COOKIE['session_token']) && !empty($_COOKIE['session_user']))
{
	include("includes/inc_head.php");
	echo "
	<script>
		var todo_session_key = '{$_COOKIE['session_token']}';
		var todo_session_user = '{$_COOKIE['session_user']}';
	</script>
	";
}
else {
	echo "
	<script>
		var todo_session_key = '';
		var todo_session_user = '';
	</script>
	";
	include("includes/inc_signin_head.php");
	include("pages/signin_1.php");
	exit;
}
?>

<body class='main-wrapper rpo'>

	<?php include("includes/inc_navbar.php");?>

	<?php include("includes/inc_mainmenu.php");?>


	<div id="content-wrapper">
<pre>
TODO:

Задачи:
1. Отображение в виде дерева

Oбщее:
1. Разграничение уровней доступа
2. Сделать систему более мощного кеширования АПИ, учитывающее параметры запроса

Feedback:
- в зависимости от статуса таска было б удобно заценивать раскрашенные строки с ними в таймшите
- возможность сортировки тасков
</pre>
	</div>


</body>

</html>