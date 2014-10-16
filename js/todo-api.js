API = {
	url: "http://trunk.todo-server",
	params: {},

	ajax: function(method, url) {
		var data = _api.params;
		_api.params = {};

		$.ajax({
			type: method,
			url: url,
			data: data,
			dataType: 'JSON',
			success: function(answer) {
				console.log(answer);
				return answer;
			},
			error: function() {
				console.log(error);
			}
		});
	},
	/*---------------------------- */

	get: {
		user: function() {
			var params = {
				id: 0,
				from: 0,
				count: 0
			};

			var url = _api.url+"/user/";

			return _api.ajax('get', url);
		}
	}
}

var _api = API;