<html>

<?php
if ($_SERVER['REMOTE_ADDR'] == '127.0.0.1') {
	include("includes/config_development.php");
}
else {
	include("includes/config_production.php");
}
?>

<?php include("includes/inc_head.php");?>

<script>
var API_DOMAIN = "<?=API_DOMAIN?>";
</script>

<body class='main-wrapper rpo'>

	<?php include("includes/inc_navbar.php");?>

	<?php include("includes/inc_mainmenu.php");?>


	<div id="content-wrapper">
<pre>
TODO:

Задачи:
1. Фильтрация
2. Отображение в виде дерева

Проекты:
1. Редактирование проекта

Общее:
1. НОТ! Авторизация
2. Разграничение уровней доступа
</pre>
	</div>


</body>

</html>