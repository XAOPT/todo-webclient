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
	<div class="project-title" data-id="{{=project.id}}"> \
		{{=project.title}}<br /> \
	</div> \
{{~}}', 
 project_edit: ' \
<h2>{{=it.title}}</h2> \
<form> \
Created: {{=it.created}} \
</form>', 
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
</div> \
{{~}}', 
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
</div>', 
 }