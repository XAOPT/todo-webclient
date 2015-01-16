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

	if ($_SERVER['REMOTE_ADDR'] == '127.0.0.1') {
		include("includes/inc_head_development.php");
	}
	else {
		include("includes/inc_head_production.php");
	}

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

В планах:
- Возможность назначать выходные дни персонально по сотрудникам
- Комментирование задач
- Логировать изменения задач
- Восстановление пароля
- Заявки на создание аккаунта
- Полноценное разграничение уровней доступа
- Сделать систему более эффективного кеширования АПИ, учитывающее параметры запроса
- Страница управления аккаунтом (редактировать аватар, пароль)
- Подробные отчёты (с детализацией по задачам)
- Переодически обновлять страницу таймшита, если её долго держат открытой.

Баги:
- Только что добавленный микротаск нельзя редактировать
- При добавлении задачи нельзя добавить ссылку
- Если задача не закреплена ни за одним проектом - крешит при попытке просмотра описания задачи
- Нельзя редактировать проект, к которому прикреплена задача

<!-- Feedback:
- в зависимости от статуса таска было б удобно заценивать раскрашенные строки с ними в таймшите
- возможность сортировки тасков
- системные уведомления о дедлайнах и новых поступлениях
- отображение в виде дерева -->
</pre>
	</div>


</body>

</html>