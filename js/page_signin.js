$(document).ready(function(){
	// Изменение размера фоновой картинки
	// пока картинки не хватает по ширине - масштабируем по ширине, когда начинает нехватать по высоте - по высоте
	var ph = $('#page-signin-bg'),
	img = ph.find('> img');

	function resize_bg() {
		img.attr('style', '');
		var img_height = img.height();
		if (img_height > 0 && img_height < ph.height()) {
			img.css({
				height: '100%',
				width: 'auto'
			});
		}
		else if (img_height == 0) {
			setTimeout(resize_bg, 20);
		}
		else {
			img.css({
				width: '100%'
			});
		}
	}

	resize_bg();

	$(window).on('resize', resize_bg);

	// Скрываем/показываем форму восстановления пароля
	$('#forgot-password-link').click(function () {
		$('#password-reset-form').fadeIn(400);
		return false;
	});
	$('#password-reset-form .close').click(function () {
		$('#password-reset-form').fadeOut(400);
		return false;
	});

	$(document).on('click', '.signin-submit', function(){
		email = $("input[name='signin_username']").val();
		pwd   = $("input[name='signin_password']").val();

		API.ajax_error = function(error) {
			$(".signin_error").html("Ошибка входа").fadeIn();
		}

		API.post.auth({"email": email, "pwd": pwd}, function(answer){
			if (typeof answer.auth_token !== 'undefined' && typeof answer.userid !== 'undefined') {
				$.cookie('session_token', answer.auth_token, { expires: 7 });
				$.cookie('session_user', answer.userid, { expires: 7 });
				location.reload();
			}
		});
	});

	$("input[name='signin_username'], input[name='signin_password']").keypress(function(e) {
    	if(e.which == 13) {
        	$('.signin-submit').click();
    	}
	});
});

function fb_login() {
	FB.login(function(response) {
		statusChangeCallback(response);
	}, {scope: 'public_profile, email'});
}

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
	console.log('statusChangeCallback', response);

	if (response.status === 'connected') {
		var data = {
			accessToken: response.authResponse.accessToken,
			signedRequest: response.authResponse.signedRequest
		}

		API.ajax_error = function(error){
			$(".signin_error").html("Аккаунт, который можно связать с фейсбуком, не найден.").fadeIn();
			FB.logout();
		};

		API.post.auth.fb(data, function(answer){
			if (typeof answer.auth_token !== 'undefined' && typeof answer.userid !== 'undefined') {
				$.cookie('session_token', answer.auth_token, { expires: 7, path: '/' });
				$.cookie('session_user', answer.userid, { expires: 7, path: '/' });
				location.reload();
			}
		});
	} else if (response.status === 'not_authorized') {
		// The person is logged into Facebook, but not your app.
	} else {
		// The person is not logged into Facebook, so we're not sure if
		// they are logged into this app or not.
	}
}

window.fbAsyncInit = function() {
	FB.init({
		appId   : '391488224350326',
		cookie  : true,
		xfbml   : true,  // parse social plugins on this page
		version : 'v2.1'
	});

	/*FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});*/
};

// Load the SDK asynchronously
(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));