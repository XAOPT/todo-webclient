var TEMPLATES = { 
	calendar_edit: ' \
<form class="form-horizontal" role="form"> \
	<input type="hidden" name="day" value="{{=it.day}}"> \
	<div class="form-group form-group-sm"> \
		<label class="col-sm-2 control-label" for="formGroupInputSmall">Выходной</label> \
		<div class="col-sm-10"> \
			<input type="checkbox" name="dayoff" class="switcher-theme-square" {{?it.kind=="dayoff"}}CHECKED{{?}}> \
		</div> \
	</div> \
</form>', 
 dom_checkbox: ' \
<div class="switcher {{=it.theme}} {{?it.checked}}checked{{?}}"> \
	<input type="checkbox" name="dayoff" {{?it.checked}}checked="checked"{{?}}> \
	<div class="switcher-toggler"></div> \
	<div class="switcher-inner"> \
		<div class="switcher-state-on"><span class="fa fa-check"></span></div><div class="switcher-state-off"><span class="fa fa-times"></span></div> \
	</div> \
</div>', 
 projects_list: ' \
<div class="panel panel-default project_list"> \
	<div class="panel-heading"> \
		<span class="panel-title"><i class="panel-title-icon fa fa-sitemap"></i>Проекты</span> \
	</div> \
	<ul class="list-group"> \
		{{~it.items :item:index}} \
		<li class="list-group-item"> \
			<div class="list-item-name"> \
				{{?item.tagcolor}} \
					<span class="tagcolor" style="background: #{{=item.tagcolor}}"></span> \
				{{?}} \
				<span class="project-edit" data-id="{{=item.id}}">{{=item.title}}</span> \
				<div class="pull-right"> \
					<button class="btn btn-info btn-sm project-edit" data-id="{{=item.id}}">Редактировать</button> \
					{{?!item.archived}} \
					<button class="btn btn-danger btn-sm archivate_project" data-confirm="Вы собираетесь заархивировать проект {{=item.title}}. \
			 			Вы уверены?" data-id="{{=item.id}}" data-archived="1">В архив</button> \
			 		{{??}} \
					<button class="btn btn-danger btn-sm archivate_project" data-confirm="Вы собираетесь извлечь из архива проект {{=item.title}}. \
			 			Вы уверены?" data-id="{{=item.id}}" data-archived="0">Оживить</button> \
			 		{{?}} \
				</div> \
			</div> \
		</li> \
		{{~}} \
	</ul> \
</div>', 
 project_full: ' \
{{? it }} \
<h2>{{=it.title}}</h2> \
<form> \
Created: {{=it.created}} \
</form> \
{{??}} \
<form class="form-horizontal" role="form"> \
	<div class="form-group"> \
		<label for="title" class="col-sm-4 control-label">Заголовок</label> \
		<div class="col-sm-4"> \
			<input type="text" name="title" class="input-sm form-control"> \
		</div> \
	</div> \
	<div class="form-group"> \
		<label for="shorttitle" class="col-sm-4 control-label">Если коротко</label> \
		<div class="col-sm-4"> \
			<input type="text" name="shorttitle" class="input-sm form-control"> \
		</div> \
	</div> \
	<div class="form-group"> \
		<label for="tagcolor" class="col-sm-4 control-label">Цвет (hex)</label> \
		<div class="col-sm-4"> \
			<input type="text" name="tagcolor" class="input-sm form-control"> \
		</div> \
	</div> \
</form> \
{{?}}', 
 task_full: ' \
{{? it.task}} \
<!-- Просмотр и редактирование задачи --> \
<h2>{{=it.task.title}}</h2> \
<div id="task_description" class="row"> \
	<span class="fa fa-times close"></span> \
	<div class="panel"> \
		<table id="user" class="table table-bordered table-striped"> \
			<tbody> \
				<tr> \
					<td width="35%">Тип задачи:</td> \
					<td width="65%"><a href="#" id="type" data-type="select" class="editable editable-click" data-pk="{{=it.task.id}}" data-value="{{=it.task.type}}"></a></td> \
				</tr> \
				<tr> \
					<td>Проект:</td> \
					<td><a href="#" id="project" data-type="select" class="editable editable-click">{{=it.project.title}}</a></td> \
				</tr> \
				<tr> \
					<td>Приоритет:</td> \
					<td><a href="#" id="priority" data-type="select" class="editable editable-click" data-pk="{{=it.task.id}}" data-value="{{=it.task.priority}}"></a></td> \
				</tr> \
				<tr> \
					<td>Статус:</td> \
					<td><a href="#" id="status" data-type="select" class="editable editable-click" data-pk="{{=it.task.id}}" data-value="{{=it.task.status}}"></a></td> \
				</tr> \
				<tr> \
					<td>Создан:</td> \
					<td>{{=it.task.created}}</td> \
				</tr> \
			</tbody> \
		</table> \
	</div> \
	{{? it.comments[0] }} \
	<div class="comment" id="comment" data-type="textarea" data-pk="{{=it.comments[0].id}}"> \
		{{? typeof it.comments[0] !== "undefined"}} \
		{{=it.comments[0].text}} \
		{{?}} \
	</div> \
	{{?}} \
	<br /><br /> \
	{{~ it.attachments :attach:index}} \
		{{?attach.is_image}} \
			<div class="lightbox thumbnail" data-id="{{=attach.id}}"> \
				<img src="{{=attach.full_url}}" alt="Click to view the lightbox"> \
				<span class="fa fa-times"></span> \
			</div> \
		{{?}} \
	{{~}} \
	<form class="dropzone" id="my-awesome-dropzone"></form> \
</div> \
{{??}} \
<!-- Добавление задачи --> \
<form> \
<div id="task_description" class="row"> \
	<div class="col-sm-12 panel"> \
		<table id="user" class="table table-bordered table-striped"> \
			<tbody> \
				<tr> \
					<td width="35%">Заголовок:</td> \
					<td width="65%"><input type="text" name="title" class="input-sm form-control"></td> \
				</tr> \
				<tr> \
					<td>Тип задачи:</td> \
					<td> \
						<select name="type" class="input-sm form-control"> \
							<option value="feature">feature</option> \
							<option value="folder">folder</option> \
							<option value="issue">issue</option> \
							<option value="milestone">milestone</option> \
							<option value="task">task</option> \
							<option value="testcase">testcase</option> \
						</select> \
					</td> \
				</tr> \
				<tr> \
					<td>Проект:</td> \
					<td> \
						<select name="project" class="input-sm form-control"> \
						{{~it.projects :project:index}} \
							<option value="{{=project.id}}">{{=project.title}}</option> \
						{{~}} \
						</select> \
					</td> \
				</tr> \
				<tr> \
					<td>Исполнитель:</td> \
					<td> \
						<select name="assignee" class="input-sm form-control"> \
						{{~it.users :user:index}} \
							<option value="{{=user.id}}">{{=user.firstname}} {{=user.lastname}}</option> \
						{{~}} \
						</select> \
					</td> \
				</tr> \
				<tr> \
					<td>Приоритет:</td> \
					<td> \
						<select name="priority" class="input-sm form-control"> \
							<option value="0">Minor</option> \
							<option value="1">Major</option> \
							<option value="2">Critical</option> \
							<option value="3">Blocker</option> \
						</select> \
					</td> \
				</tr> \
				<tr> \
					<td>Описание:</td> \
					<td><textarea name="comment" class="input-sm form-control"></textarea></td> \
				</tr> \
			</tbody> \
		</table> \
	</div> \
</div> \
</form> \
{{?}} \
', 
 timesheet_edit: ' \
<form class="form-horizontal" role="form"> \
	<input type="hidden" name="day" value="{{=it.day}}"> \
	<input type="hidden" name="userid" value="{{=it.userid}}"> \
	<input type="hidden" name="taskid" value="{{=it.taskid}}"> \
	<div class="form-group"> \
		<label class="col-sm-4 control-label" for="formGroupInputSmall">Потрачено часов</label> \
		<div class="col-sm-7"> \
			<input type="text" class="form-control input-sm" name="worktimeHours" value="{{? typeof it.item !== "undefined"}}{{=it.item.worktimeHours}}{{??}}0{{?}}"> \
		</div> \
		<label class="col-sm-4 control-label" for="formGroupInputSmall">Комментарий</label> \
		<div class="col-sm-7"> \
			<textarea class="form-control" rows="3"> \
			{{? typeof it.item !== "undefined"}}{{it.item.comment}}{{?}} \
			</textarea> \
		</div> \
	</div> \
</form> \
', 
 timesheet_taskbody: ' \
<tr><td colspan="{{=it.day_count}}">&nbsp;</td></tr> \
{{~it.task :task:index}} \
	<tr data-taskid="{{=task.taskid}}" data-userid="{{=task.userid}}"> \
	{{~task.days :day:day_index}} \
		<td data-day="{{=day.day}}" class="{{=day.day_kind}}">{{=day.hours}}</td> \
	{{~}} \
	</tr> \
{{~}} \
', 
 timesheet_taskhead: ' \
<tr data-taskid="{{=it.task.id}}"> \
	<td class="tp" style="background-color: {{=it.tagcolor}}">{{=it.shorttitle}}</td> \
	<td></td> \
	<td class="tt priority-{{=it.task.priority}}">{{=it.task.title}}</td> \
	<td></td> \
	<td></td> \
</tr> \
', 
 timesheet_taskhead_user: ' \
<tr> \
	<td colspan="5" class="user"> \
	<img class="avatar {{? it.deleted }}grayscale{{?}}" src="{{? it.email }}http://www.gravatar.com/avatar/{{=md5(it.email)}}?d=mm{{??}}img/avatar1.jpg{{?}}"> \
	{{=it.firstname}} {{=it.lastname}} \
	</td> \
</tr>', 
 users_list: ' \
<div class="panel panel-default user_list"> \
	<div class="panel-heading"> \
		<span class="panel-title"><i class="panel-title-icon fa fa-users"></i>Сотрудники</span> \
		{{?it.pages.length > 0}} \
		<div class="panel-heading-controls"> \
			<ul class="user-pagination pagination pagination-xs"> \
				{{~it.pages :page:index}} \
				<li {{?index==it.active_page}}class="active"{{?}}><a href="#" data-page="{{=index}}">{{=index+1}}</a></li> \
				{{~}} \
			</ul> \
		</div> \
		{{?}} \
	</div> \
	<ul class="list-group"> \
		{{~it.items :user:index}} \
		<li class="list-group-item"> \
			<div class="list-item-name"> \
				<img class="avatar {{? user.deleted }}grayscale{{?}}" src="{{? user.email }}http://www.gravatar.com/avatar/{{=md5(user.email)}}?d=mm{{??}}img/avatar1.jpg{{?}}"> \
				{{? user.firstname || user.lastname}} \
					{{=user.firstname}} {{=user.lastname}} \
				{{??}} \
					<i>Не подтвержён</i> \
				{{?}} \
				<div class="pull-right"> \
					{{? user.email }} \
					<span class="label label-default"> \
						{{=user.email}} \
					</span>&nbsp; \
					{{?}} \
					<button class="btn btn-info btn-sm edit_user" data-id="{{=user.id}}">Редактировать</button> \
					<button class="btn btn-danger btn-sm remove_user" data-confirm="Вы собираетесь заблокировать пользователя {{=user.firstname}} {{=user.lastname}}. \
						Вы уверены?" data-id="{{=user.id}}" data-deleted="{{=user.deleted}}">{{? user.deleted }}Разблок{{??}}Блок{{?}}</button> \
				</div> \
			</div> \
		</li> \
		{{~}} \
	</ul> \
</div>', 
 user_add: ' \
<form class="form-horizontal" role="form"> \
	<div class="form-group form-group-sm"> \
		<label class="col-sm-2 control-label">E-mail</label> \
		<div class="col-sm-10"> \
			<input type="text" name="email" class="form-control"> \
		</div> \
	</div> \
	<div class="form-group form-group-sm"> \
		<label class="col-sm-2 control-label">Роль</label> \
		<div class="col-sm-10"> \
			<select name="role" class="form-control"> \
				<option val="1">Admin</option> \
				<option val="2">Manager</option> \
				<option val="3">Worker</option> \
			</select> \
		</div> \
	</div> \
</form>', 
 user_edit: ' \
<form class="form-horizontal" role="form"> \
	<div class="form-group form-group-sm"> \
		<label class="col-sm-2 control-label">Имя</label> \
		<div class="col-sm-10"> \
			<input type="text" name="firstname" class="form-control" value="{{= it.firstname}}"> \
		</div> \
	</div> \
	<div class="form-group form-group-sm"> \
		<label class="col-sm-2 control-label">Фамилия</label> \
		<div class="col-sm-10"> \
			<input type="text" name="lastname" class="form-control" value="{{= it.lastname}}"> \
		</div> \
	</div> \
	<div class="form-group form-group-sm"> \
		<label class="col-sm-2 control-label">E-mail</label> \
		<div class="col-sm-10"> \
			<input type="text" name="email" class="form-control" value="{{= it.email}}"> \
		</div> \
	</div> \
	<div class="form-group form-group-sm"> \
		<label class="col-sm-2 control-label">Роль</label> \
		<div class="col-sm-10"> \
			<select name="role" class="form-control"> \
				<option val="1">Admin</option> \
				<option val="2">Manager</option> \
				<option val="3">Worker</option> \
			</select> \
		</div> \
	</div> \
	<div class="form-group form-group-sm"> \
		<div class="col-sm-2"></div> \
		<div class="col-sm-10"> \
			Добавлен: {{= it.created}} \
		</div> \
	</div> \
</form>', 
 }