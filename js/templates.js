var TEMPLATES = {users_list:'{{~it.users :user:index}} \
<div class="user_card" data-id="{{=user.id}}" > \
	<div class="first_row"> \
		<img class="avatar" src="img/avatar1.jpg"> \
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
{{~}}',user_edit:'<div class="user_card" data-id="{{=it.id}}" > \
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
</div>',}