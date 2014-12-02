<script>
$(document).ready(function(){
	init_timesheet_interface();
});
</script>

<div class="page-header">
	<h1>Timesheet</h1>
</div>

<div class="page-header-menu">
	<button class="btn btn-flat btn-sm btn-labeled btn-primary" id="toggle-filter-options"><span class="btn-label icon fa fa-filter"></span>Фильтр</button>
	<button class="btn btn-flat btn-sm btn-labeled btn-success" id="add-task-button"><span class="btn-label icon fa fa-plus"></span>Добавить</button>
</div>

<div class="row">
	<div class="col-sm-12 filter-options panel" style='display: none;'>
		<div class="panel-heading">
			<span class="panel-title"><i class="panel-title-icon fa fa-comments-o"></i>Настройки фильтра</span>
		</div>
		<div class="panel-body">
			<form id="timesheetFilter">
			<table id="user" class="table table-bordered table-striped" style="clear: both">
				<tbody>
					<tr>
						<td width="35%">Группы пользователей</td>
						<td width="65%"><a href="#" id="filter_user_groups" data-type="checklist" class="editable editable-click" data-title="Выберите группы"></a></td>
					</tr>
					<tr>
						<td>Проекты</td>
						<td><a href="#" id="filter_projects" data-type="checklist" data-title="Укажите проекты" class="editable editable-click"></a></td>
					</tr>
					<tr>
						<td>Пользователи</td>
						<td><a href="#" id="filter_assignee" data-type="checklist" class="editable editable-click"></a></td>
					</tr>
					<tr>
						<td>Приоритет</td>
						<td><a href="#" id="filter_priority" data-type="checklist" class="editable editable-click"></a></td>
					</tr>
					<tr>
						<td>Статус</td>
						<td><a href="#" id="filter_status" data-type="checklist" class="editable editable-click"></a></td>
					</tr>
				</tbody>
			</table>
			<div class="alert alert-warning">Внимание! Большой список пользователей и проектов может привезти к замедлению работы страницы!</div>
			<input type='submit' class="btn btn-flat btn-sm btn-success" id="saveTimesheetFilter">
			</form>
		</div>
	</div>
</div>

<div class="row">
	<div class="col-sm-12">

		<div id="timesheet">
			<div class="task-list">
				<table class="table table-bordered table-primary">
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
				</table>
				<div class='wrapper'>
					<table class="table table-bordered">
						<tbody>
						</tbody>
					</table>
				</div>
			</div>
			<div class="task-hours">
				<div class="table-head">
					<table class="table table-bordered table-primary">
						<thead>
						</thead>
					</table>
				</div>
				<div class="wrapper">
					<table class="table table-bordered">
						<thead>
						</thead>
						<tbody>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="item-description" style="z-index: 50;">
	<div class='bg' id="description"></div>
	<span class="fa fa-times close"></span>
</div>