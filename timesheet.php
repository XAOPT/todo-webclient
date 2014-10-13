<html>

<?php include("inc_head.php");?>

<body class='main-wrapper'>

<?php include("inc_navbar.php");?>

<?php include("inc_mainmenu.php");?>

<script>
$(document).ready(function(){
	var $demoTable = $("table.demo1");
    $demoTable.floatThead({
        //the pageTop is a global function i have here, it takes care of making the table float under my floated nav
        scrollingTop: 0,
        scrollContainer: function($table){
            return $table.closest('.task-list');
        },
        useAbsolutePositioning: true
    });

	var $demoTable = $("table.demo2");
    $demoTable.floatThead({
        //the pageTop is a global function i have here, it takes care of making the table float under my floated nav
        scrollingTop: 0,
        scrollContainer: function($table){
            return $table.closest('.wrapper');
        },
        useAbsolutePositioning: true
    });

	$(".wrapper").scroll(function () {
		var scrollTop = $(this).scrollTop();
        $(".wrapper").scrollTop(scrollTop);
    });
});
</script>

<div id="content-wrapper">
	<div class="page-header">
		<h1>Timesheet</h1>
	</div>

	<div class="row">
		<div class="col-sm-12">

			<div class="task-list wrapper" style="">
						<div class="table-header table-primary">
							Primary
						</div>
						<table class="table table-bordered demo1 table-primary">
							<thead>
								<tr>
									<th>Пр</th>
									<th></th>
									<th>Название</th>
									<th>Тр</th>
									<th>Ф.тр</th>
								</tr>
							</thead>
							<tbody>
							<tr>
								<td>123</td>
								<td>123</td>
								<td>123</td>
								<td>123</td>
								<td>123</td>
							</tr>
							<tr>
																<td>123</td>
								<td>123</td>
								<td>123</td>
								<td>123</td>
								<td>123</td>
							</tr>
							<tr>
								<td>123</td>
								<td>123</td>
								<td>123</td>
								<td>123</td>
								<td>123</td>
							</tr>
							<tr>
								<td>123</td>
								<td>123</td>
								<td>123</td>
								<td>123</td>
								<td>123</td>
							</tr>
							<tr>
								<td>123</td>
								<td>123</td>
								<td>123</td>
								<td>123</td>
								<td>123</td>
							</tr>
							<tr>
								<td>123</td>
								<td>123</td>
								<td>123</td>
								<td>123</td>
								<td>123</td>
							</tr>
							<tr>
								<td>123</td>
								<td>123</td>
								<td>123</td>
								<td>123</td>
								<td>123</td>
							</tr>
							<tr>
								<td>123</td>
								<td>123</td>
								<td>123</td>
								<td>123</td>
								<td>123</td>
							</tr>
						</tbody>
					</table>

			</div>
			<div class="task-hours wrapper">
					<div class="table-header table-primary">
						Primary
					</div>
					<table class="table table-bordered demo2 table-primary">
						<thead>
							<tr>
								<?php
								for ($i=1; $i<=60; $i++)
								{
									echo "<th>".$i."</th>";
								}
								?>
							</tr>
						</thead>
						<tbody>
							<tr>
								<?php
								for ($i=1; $i<=60; $i++)
								{
									echo "<td>".rand(0,4)."</td>";
								}
								?>
							</tr>
							<tr>
								<?php
								for ($i=1; $i<=60; $i++)
								{
									echo "<td>".rand(0,4)."</td>";
								}
								?>
							</tr>
							<tr>
								<?php
								for ($i=1; $i<=60; $i++)
								{
									echo "<td>".rand(0,4)."</td>";
								}
								?>
							</tr>
							<tr>
								<?php
								for ($i=1; $i<=60; $i++)
								{
									echo "<td>".rand(0,4)."</td>";
								}
								?>
							</tr>
							<tr>
								<?php
								for ($i=1; $i<=60; $i++)
								{
									echo "<td>".rand(0,4)."</td>";
								}
								?>
							</tr>
							<tr>
								<?php
								for ($i=1; $i<=60; $i++)
								{
									echo "<td>".rand(0,4)."</td>";
								}
								?>
							</tr>
							<tr>
								<?php
								for ($i=1; $i<=60; $i++)
								{
									echo "<td>".rand(0,4)."</td>";
								}
								?>
							</tr>
							<tr>
								<?php
								for ($i=1; $i<=60; $i++)
								{
									echo "<td>".rand(0,4)."</td>";
								}
								?>
							</tr>
						</tbody>
					</table>
			</div>

		</div>
	</div>

</div>

</body>

</html>