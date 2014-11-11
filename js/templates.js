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
{{~it.items :project:index}} \
	<div class="project-title {{? project.archived}}archived{{?}}" data-id="{{=project.id}}"> \
		{{=project.title}} \
	</div> \
{{~}}', 
 project_full: ' \
{{? it }} \
<span class="fa fa-times close"></span> \
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
{{~it.items :user:index}} \
<div class="user_card" data-id="{{=user.id}}" > \
	<div class="first_row"> \
		<img class="avatar {{? user.deleted }}grayscale{{?}}" src="{{? user.email }}http://www.gravatar.com/avatar/{{=md5(user.email)}}?d=mm{{??}}img/avatar1.jpg{{?}}"> \
		<div> \
			<div class="name">{{=user.firstname}} {{=user.lastname}}</div> \
			<div class="role">{{=user.role}}</div> \
		</div> \
	</div> \
	<div class="second_row"> \
		<div class="fa settings">100</div> \
		<div class="fa projects">1</div> \
		<div class="is_active">{{? user.deleted }}Fired{{??}}Active{{?}}</div> \
	</div> \
	<span class="fa fa-trash-o remove"></span> \
</div> \
{{~}}', 
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
 user_delete: ' \
<form> \
	<input type="hidden" name="userid" value="{{=it.userid}}"> \
	Вы действительно хотите удалить пользователя? \
</form>', 
 user_edit: ' \
<div class="user_card" data-id="{{=it.id}}" > \
	<div class="first_row"> \
		<img class="avatar" src="img/avatar1.jpg"> \
		<div> \
			<div class="name">{{=it.firstname}} {{=it.lastname}}</div> \
			<div class="role">{{=it.role}}</div> \
		</div> \
	</div> \
	<div class="second_row"> \
		<div class="fa settings">100</div> \
		<div class="fa projects">1</div> \
		<div class="is_active">{{? it.deleted }}Fired{{??}}Active{{?}}</div> \
	</div> \
	<span class="fa fa-trash-o remove"></span> \
</div>', 
 }