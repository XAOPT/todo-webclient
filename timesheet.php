<script>
$(document).ready(function(){
	$(".wrapper").scroll(function () {
		var scrollTop = $(this).scrollTop();
        $(".wrapper").scrollTop(scrollTop);
    });

	var $demoTable = $("table.demo1");
    $demoTable.floatThead({
        //the pageTop is a global function i have here, it takes care of making the table float under my floated nav
        scrollingTop: 0,
        scrollContainer: function($table){
            return $table.closest('.wrapper');
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
});
</script>


	<div class="page-header">
		<h1>Timesheet</h1>
	</div>

	<div class="row">
		<div class="col-sm-12">

			<div id="timesheet">
				<div class="task-list wrapper" style="">
					<table class="table table-bordered demo1 table-primary">
						<thead>
							<tr>
								<th colspan='5'>Задачи по пользователям</th>
							</tr>
							<tr>
								<th>Пр</th>
								<th></th>
								<th class='tt'>Название</th>
								<th>Тр</th>
								<th>Ф.тр</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td colspan='5' class="user">Денис Петров</td>
							</tr>
							<tr>
								<td>TZ</td>
								<td></td>
								<td class='tt'>Реализация Fb, OK, Vk, MM</td>
								<td>5</td>
								<td>5</td>
							</tr>
							<tr>
								<td>C</td>
								<td></td>
								<td class='tt'>работа над API</td>
								<td>880</td>
								<td>880</td>
							</tr>
							<tr>
								<td>123</td>
								<td>123</td>
								<td class='tt'>123</td>
								<td>123</td>
								<td>123</td>
							</tr>
							<tr>
								<td>123</td>
								<td>123</td>
								<td class='tt'>123</td>
								<td>123</td>
								<td>123</td>
							</tr>
							<tr>
								<td>123</td>
								<td>123</td>
								<td class='tt'>123</td>
								<td>123</td>
								<td>123</td>
							</tr>
							<tr>
								<td>123</td>
								<td>123</td>
								<td class='tt'>123</td>
								<td>123</td>
								<td>123</td>
							</tr>
							<tr>
								<td>123</td>
								<td>123</td>
								<td class='tt'>123</td>
								<td>123</td>
								<td>123</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="task-hours">
					<div class="wrapper">
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
	</div>
