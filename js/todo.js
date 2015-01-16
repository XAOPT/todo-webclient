/* контроллер левого меню */
var mainMenu = {
	submenu_locker: false,
	hide_submenu: function() {
		setTimeout(function(){
			if (!mainMenu.submenu_locker)
				$(".mmc-dropdown-open-ul").remove();
		},1000);
	},
	init: function() {
		$("#main-menu").on("click", "a", function(){
			var a = $(this);

			var LI = $(this).parent();

			LI.siblings("LI").not(LI).each(function(){
				$(this).find("UL:first").slideUp("fast", function(){$(this).removeClass("open")}.bind($(this)));
			});

			if (LI.hasClass("open")) {
				LI.find("UL:first").slideUp("fast", function(){LI.removeClass("open")});
			}
			else {
				LI.find("UL:first").slideDown("fast", function(){LI.addClass("open"); LI.find("UL:first").removeAttr('style');})
			}

			$(".main-wrapper").removeClass("rpo");

			if (a.attr("href") !== "#") { // загружаем новую страницу только в том случае, если ссылка не пустая
				$("#main-menu li").removeClass("active");
				a.parent().addClass("active");

				a.parents(".mm-dropdown").addClass("open"); // откроем все родительские раскладывающиеся менюшки

				window.history.pushState({},"", a.attr("href"));
				$.ajax({
					type: 'get',
					url: window.location.hash.substring(1, window.location.hash.length),
					dataType: 'HTML',
					success: function(answer) {
						$("#content-wrapper").html(answer);
					}
				});
			}

			return false;
		});

		$("#main-menu").on({
			mouseenter: function() {
				mainMenu.submenu_locker = true;
			},
			mouseleave: function() {
				mainMenu.submenu_locker = false;
				mainMenu.hide_submenu();
			}
		}, ".mmc-dropdown-open-ul");

		$("LI.mm-dropdown").hover(
			function(){
				mainMenu.submenu_locker = true;

				$(".mmc-dropdown-open-ul").remove();

				var head = $(this).find(".mm-text:first").clone();
				$(this).find("UL:first").clone().removeClass("fadeInLeft").addClass("mmc-dropdown-open-ul").css({"top": $(this).position().top}).appendTo("#main-menu").prepend(head.addClass('mmc-title'));

			},
			function(){
				mainMenu.submenu_locker = false;
				mainMenu.hide_submenu();
			}
		);

		$(".navigation a[href='"+window.location.hash+"']").click();
	}
};


$(document).ready(function() {

	$.extend($.summernote.options, {
		toolbar: [
			['style', ['bold', 'italic', 'underline','clear','strikethrough']],
			['color', ['color']],
			['insert', ['ul','table','hr','link']],
			['misc', ['codeview']],
		],
		height: 300,
		minHeight: null,
		maxHeight: null
	});

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

		$("<img/>").attr("src", src).load(function(){
			img_real_width = this.width;
			img_real_height = this.height;

			var dialog = new BootstrapDialog({
				"message": "<img src='"+src+"' class='lightbox_modal_image'>"
			});

			dialog.realize();
			//dialog.getModalHeader().hide();
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

	$(document).on('click', '.rpo-close', function() {
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

