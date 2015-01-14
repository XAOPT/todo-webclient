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
	<div class="col-sm-12">

		<div id="timesheet">
			<div class="task-list">
				<table class="table table-bordered table-primary">
					<thead>
						<tr>
							<th colspan='2'>Задачи по пользователям</th>
						</tr>
						<tr>
							<th class='tp'>Пр</th>
							<th class='tt'>Название</th>
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
	<span class="fa fa-times rpo-close"></span>
</div>