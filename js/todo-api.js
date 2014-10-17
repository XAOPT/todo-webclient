API = {
	url: "http://trunk.todo-server",
	params: {},

	ajax: function(method, url, cb) {
		var data = _api.params;
		_api.params = {};

		$.ajax({
			type: method,
			url: url,
			data: data,
			dataType: 'JSON',
			success: function(answer) {
				cb(answer);
			},
			error: function() {
				console.log(error);
			}
		});
	},
	/*---------------------------- */

	get: {
		user: function(params, cb) {
			if (typeof params === 'function')
				cb = params;
			else {
				_api.params = params;
			}

			var url = _api.url+"/user/";

			_api.ajax('get', url, cb);
		},
		convert: {
			users: function(params, cb) {
				if (typeof params === 'function')
					cb = params;
				else {
					_api.params = params;
				}

				var url = _api.url+"/convert/users/";

				_api.ajax('get', url, cb);
			}
		}
	}
}

var _api = API;

