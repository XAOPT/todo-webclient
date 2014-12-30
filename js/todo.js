
$(document).ready(function() {

	$.summernote.options.toolbar = [
		['style', ['bold', 'italic', 'underline','clear','strikethrough']],
		['color', ['color']],
		['insert', ['ul','table','hr','link']],
		['misc', ['codeview']],
	];
	$.summernote.options.height = 300;
	$.summernote.options.minHeight = null;
	$.summernote.options.maxHeight = null;

	$.fn.editable.defaults.mode = 'popup';
	$.fn.editable.defaults.placement = 'left';
	$.fn.editableform.buttons = '<button type="submit" class="btn btn-primary btn-sm editable-submit"><i class="fa fa-fw fa-check"></i></button><button type="button" class="btn btn-default btn-sm editable-cancel"><i class="fa fa-fw fa-times"></i></button>';

	for (var prop in TEMPLATES)
	{
		TEMPLATES[prop] = doT.template(TEMPLATES[prop]);
	}

	BootstrapDialog.prototype.updateAnimate = function(){return;};
	BootstrapDialog.configDefaultOptions({ onshown: function() {
		$("input[type=checkbox]").replaceWith(function(){
			var data = {
				'checked': $(this).prop("checked"),
				'theme': $(this).attr('class'),
				'name': $(this).attr('name'),
				'value': $(this).attr('value')?$(this).attr('value'):false
			};

			return TEMPLATES.dom_checkbox(data);
		});
	} });

	BootstrapDialog.prototype.open = function(cb) {
        !this.isRealized() && this.realize();
        this.getModal().modal('show');
        this.updateZIndex();
        this.setOpened(true);

        if (typeof cb != 'undefined')
        	cb();

        return this;
    }

	BootstrapDialog.confirm = function(message, params, callback) {
		if (typeof params === 'function')
			callback = params;

		var dialog = new BootstrapDialog({
			title: params.title || 'Подтвердите действие',
			cssClass: params.cssClass || '',
			type: params.type || 'type-primary',
			message: message,
			data: {
				'callback': callback
			},
			buttons: [
				{
					label: 'Cancel',
					action: function(dialog) {
						typeof dialog.getData('callback') === 'function' && dialog.getData('callback')(false, dialog);
						dialog.close();
					}
				},
				{
					label: 'OK',
					cssClass: 'btn-primary',
					action: function(dialog) {
						typeof dialog.getData('callback') === 'function' && dialog.getData('callback')(true, dialog);
						dialog.close();
					}
				}
			]
		});

		if (typeof params.afterRender !== 'undefined') {
			dialog.open(params.afterRender);
		}
		else {
			dialog.open();
		}
	};

	/**/

	API.get_me(function(){
		$(".hello-text > .text-semibold").html(API.me.firstname);
		$("#navbar_name").html(API.me.firstname + ' ' + API.me.lastname);
		$("#navbar_avatar, #mainmenu_avatar").attr("src", "http://www.gravatar.com/avatar/"+md5(API.me.email)+"?d=mm");
	});


	/* дефолтные настройки для гроула */

	$.growl(false, {
		type: "success",
		placement: {
			align: "center"
		},
		animate: {
			enter: 'animated bounceIn',
			exit: 'animated bounceOut'
		}
	});

	/* lightbox imitation */
	$(document).on('click', '.lightbox img', function(){
		var src = $(this).attr("src");
		var img_real_width, img_real_height;
		console.log(src);

		$("<img/>").attr("src", src).load(function(){
			img_real_width = this.width;
			img_real_height = this.height;

			var dialog = new BootstrapDialog({
				"message": "<img src='"+src+"' class='lightbox_modal_image'>"
			});

			dialog.realize();
			dialog.getModalHeader().hide();
			dialog.getModalFooter().hide();
			if (img_real_width > 600) {
				img_real_width = 600;
			}
			dialog.getModal().find(".modal-dialog").css("width", img_real_width+30+"px");
			dialog.open();
		});
	});

	// нажатие на кнопку удаления аттача
	$(document).on('click', '.lightbox span', function(event) {
		event.preventDefault();
		var lightbox_box = $(this).parent();
		var attachment_id = lightbox_box.data("id");

		API.delete.task.attachment({"id": attachment_id}, function(answer){
			lightbox_box.fadeOut().animate({width: 0}).remove();
			$.growl("Прикреплённый файл удалён!");
		});
	});

	/* --------- */

	$(document).on('click', '.switcher', function(){
		$(this).toggleClass('checked');
		var box =  $(this).find('input');
		box.prop("checked", !box.prop("checked"));
	});

	$(document).on('click', '.close', function() {
		$(".main-wrapper").removeClass("rpo");
	});

	/*left navigation */
	mainMenu.init();

	$("#main-menu-toggle").click(function(){
		$("BODY").toggleClass("mmc");
	});

	$( window ).resize(function() {
		var windowWidth = $( window ).width();

		if (windowWidth < 840) {
			$("BODY").addClass("mmc");
		}
	});

	/* top navigation */
	$(".profileDialog").click(function(){
		BootstrapDialog.show({
			title: "<h5>Профиль</h5>",
			message: $('<div></div>').load('profile.php')
		});
	});

	$("#logoutButton").click(function(event){
		API.not_authed();
	});

	/* convert */

	$("#content-wrapper").on('click', '.convert_users', function() {
		API.get.convert.users(function(answer){
			BootstrapDialog.show({
				message: "OK"
			});
		});
	});

	$("#content-wrapper").on('click', '.convert_projects', function() {
		API.get.convert.projects(function(answer){
			BootstrapDialog.show({
				message: "OK"
			});
		});
	});

	$("#content-wrapper").on('click', '.convert_tasks', function() {
		API.get.convert.tasks(function(answer){
			BootstrapDialog.show({
				message: "OK"
			});
		});
	});
});

