API = {
	me: {},
	url: API_DOMAIN,
	params: {},
	cache_ajax: 0,
	cache: {
		/*
		"element": {
			"data": {}, // закешированные данные
			"timestamp":  // время, когда элемент был закеширован
		}
		*/
	},
	not_authed: function(){
		$.cookie('session_token', "", { expires: 0 });
		$.cookie('session_user', "", { expires: 0 });
		window.location = "/";
	},
	clear_cache: function(element) {
		if (typeof this.cache[element] !== 'undefined') {
			delete this.cache[element];
		}
	},
	check_cache: function(element, expireSeconds) {
		if (typeof this.cache[element] !== 'undefined') {
			var current_timestamp = new Date().getTime();

			if ( current_timestamp - this.cache[element].timestamp > expireSeconds*100 ) {
				delete this.cache[element];
				return false;
			}
			else
				return this.cache[element].data;
		}

		return false;
	},
	ajax_error: function(error) {
		$.growl("<b>"+error.responseJSON.ErrorCode+":</b> "+error.responseJSON.ErrorMessage, {type: "danger"});

		console.log(error);
	},
	ajax: function(method, url, cb) {
		if ((typeof todo_session_key === 'undefined' || typeof todo_session_user === 'undefined') && url !== '/auth/fb/') {
			API.not_authed();
			return;
		}

		var data = _api.params;
		var cache_ajax = _api.cache_ajax;

		_api.cache_ajax = 0;
		_api.params = {};

		if (method != 'get') {
			data = JSON.stringify(data);
		}


		if (cache_ajax) {
			var answer = this.check_cache(url, cache_ajax);

			if (answer !== false) {
				console.log('CACHE', url, answer);
				if (typeof cb !== 'undefined') {
					cb(answer);
					return;
				}
			}
		}

		if (typeof todo_session_key !== 'undefined' && typeof todo_session_user !== 'undefined') {
			url += "?auth_token="+todo_session_key+"&session_user="+todo_session_user;
		}

		$.ajax({
			type: method,
			url: _api.url+url,
			data: data,
			async: true,
			dataType: 'JSON',
			success: function(answer) {
				console.log(url, answer);

				if (cache_ajax > 0) {
					_api.cache[url] = {
						"data": answer,
						"timestamp": new Date().getTime()
					};
				}

				if (typeof cb !== 'undefined')
					cb(answer);
			},
			error: function(error) {
				if (typeof error.status !== 'undefined'
					&& error.status == '401'
					)
				{
					API.not_authed();
					return;
				}

				API.ajax_error(error);
			}
		});
	},
	get_me: function(cb) {
		if (typeof API.me.id !== 'undefined') {
			cb();
		}
		else if (typeof todo_session_user !== 'undefined') {
			API.get.user({id: todo_session_user}, function(users) {
				API.me = users.items[0];
				cb();
			});
		}
		else {
			API.not_authed();
		}
	},
	/*---------------------------- */

	get: {
		user: function(params, cb) {
			if (typeof params === 'function') {
				cb = params;
				_api.cache_ajax = 180;
			}
			else {
				_api.params = params;
			}

			_api.ajax('get', "/user/", cb);
		},
		project: function (params, cb) {
			if (typeof params === 'function') {
				cb = params;
				_api.cache_ajax = 180;
			}
			else {
				_api.params = params;
			}

			var url = "/project/";

			if (typeof params.id !== 'undefined') {
				url = url+params.id+"/";
			}

			_api.ajax('get', url, cb);
		},
		calendar: function(params, cb) {
			_api.params = params;

			_api.ajax('get', "/calendar/", cb);
		},
		task: function(params, cb) {
			if (typeof params === 'function')
				cb = params;
			else {
				_api.params = params;
			}

			_api.ajax('get', "/task/", cb);
		},
		timesheet: function(params, cb) {
			if (typeof params === 'function')
				cb = params;
			else {
				_api.params = params;
			}

			_api.ajax('get', "/timesheet/", cb);
		},
		comment: function(params, cb) {
			if (typeof params === 'function')
				cb = params;
			else {
				_api.params = params;
			}

			_api.ajax('get', "/comment/", cb);
		},
		role: function(params, cb) {
			if (typeof params === 'function')
				cb = params;

			var url = "/role/";

			if (typeof params.id !== 'undefined') {
				url = url+params.id+"/";
			}

			_api.ajax('get', url, cb);
		},
		convert: {
			users: function(cb) {
				_api.ajax('get', "/convert/users/", cb);
			},
			projects: function(cb) {
				_api.ajax('get', "/convert/projects/", cb);
			},
			tasks: function(cb) {
				_api.ajax('get', "/convert/tasks/", cb);
			},
		}
	},
	post: {
		auth: function(params, cb) {
			_api.params = params;
			_api.ajax('post', "/auth/", cb);
		},
		user: function(params, cb) {
			_api.params = params;

			_api.ajax('post', "/user/", cb);
		},
		role: function(params, cb) {
			_api.params = params;

			_api.ajax('post', "/role/", cb);
		},
		task: function(params, cb) {
			_api.params = params;

			_api.ajax('post', "/task/", cb);
		},
		project: function(params, cb){
			_api.params = params;

			_api.clear_cache("/project/");
			_api.ajax('post', "/project/", cb);
		}
	},
	put: {
		task: function(params, cb) {
			_api.params = params;

			var url = "/task/";

			if (typeof params.id !== 'undefined') {
				url = url+params.id+"/";
			}

			_api.clear_cache(url);
			_api.ajax('put', url, cb);
		},
		comment: function(params, cb){
			_api.params = params;

			var url = "/comment/";

			if (typeof params.id !== 'undefined') {
				url = url+params.id+"/";
			}

			_api.clear_cache(url);
			_api.ajax('put', url, cb);
		},
		calendar: function(params, cb) {
			_api.params = params;

			var url = "/calendar/";

			_api.clear_cache(url);
			_api.ajax('put', url, cb);
		},
		timesheet: function(params, cb) {
			_api.params = params;

			var url = "/timesheet/";

			_api.clear_cache(url);
			_api.ajax('put', url, cb);
		},
		user: function(params, cb) {
			_api.params = params;

			var url = "/user/";

			if (typeof params.id !== 'undefined') {
				url = url+params.id+"/";
			}

			_api.clear_cache(url);
			_api.ajax('put', url, cb);
		},
		role: function(params, cb) {
			_api.params = params;

			var url = "/role/";

			if (typeof params.id !== 'undefined') {
				url = url+params.id+"/";
			}

			_api.clear_cache(url);
			_api.ajax('put', url, cb);
		},
		project: function(params, cb) {
			_api.params = params;

			var url = "/project/";

			if (typeof params.id !== 'undefined') {
				url = url+params.id+"/";
			}

			_api.clear_cache(url);
			_api.ajax('put', url, cb);
		}
	},
	delete: {
		role: function(params, cb) {
			if (typeof params.id === 'undefined')
				cb();

			_api.ajax('delete', "/role/"+params.id+"/", cb);
		},
		task: function() {
			console.log(456);
		}
	}
}

API.get.user.clientSettings = function(cb)
{
	_api.cache_ajax = 180;

	_api.ajax('get', "/user/clientSettings/", function(answer){
		cb(answer.clientSettings);
	});
}

API.get.timesheet.summary = function(params, cb) {
	if (typeof params.userid === 'undefined')
		return;

	_api.params = params;

	_api.ajax('get', "/timesheet/"+params.userid+'/summary/', cb);
}

API.put.user.clientSettings = function(params, cb) {
	_api.params = params;

	_api.ajax('put', "/user/clientSettings/", cb);
}

API.delete.task.attachment = function(params, cb) {
	_api.params = params;
	_api.ajax('delete', "/task/attachment/", cb);
}

API.post.auth.fb = function(params, cb) {
	_api.params = params;
	_api.ajax('post', "/auth/fb/", cb);
}

var _api = API;
function utf8_encode ( str_data ) {	// Encodes an ISO-8859-1 string to UTF-8
	//
	// +   original by: Webtoolkit.info (http://www.webtoolkit.info/)

	str_data = str_data.replace(/\r\n/g,"\n");
	var utftext = "";

	for (var n = 0; n < str_data.length; n++) {
		var c = str_data.charCodeAt(n);
		if (c < 128) {
			utftext += String.fromCharCode(c);
		} else if((c > 127) && (c < 2048)) {
			utftext += String.fromCharCode((c >> 6) | 192);
			utftext += String.fromCharCode((c & 63) | 128);
		} else {
			utftext += String.fromCharCode((c >> 12) | 224);
			utftext += String.fromCharCode(((c >> 6) & 63) | 128);
			utftext += String.fromCharCode((c & 63) | 128);
		}
	}

	return utftext;
}

function md5 ( str ) {	// Calculate the md5 hash of a string
	//
	// +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
	// + namespaced by: Michael White (http://crestidg.com)

	var RotateLeft = function(lValue, iShiftBits) {
			return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
		};

	var AddUnsigned = function(lX,lY) {
			var lX4,lY4,lX8,lY8,lResult;
			lX8 = (lX & 0x80000000);
			lY8 = (lY & 0x80000000);
			lX4 = (lX & 0x40000000);
			lY4 = (lY & 0x40000000);
			lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
			if (lX4 & lY4) {
				return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
			}
			if (lX4 | lY4) {
				if (lResult & 0x40000000) {
					return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
				} else {
					return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
				}
			} else {
				return (lResult ^ lX8 ^ lY8);
			}
		};

	var F = function(x,y,z) { return (x & y) | ((~x) & z); };
	var G = function(x,y,z) { return (x & z) | (y & (~z)); };
	var H = function(x,y,z) { return (x ^ y ^ z); };
	var I = function(x,y,z) { return (y ^ (x | (~z))); };

	var FF = function(a,b,c,d,x,s,ac) {
			a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
			return AddUnsigned(RotateLeft(a, s), b);
		};

	var GG = function(a,b,c,d,x,s,ac) {
			a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
			return AddUnsigned(RotateLeft(a, s), b);
		};

	var HH = function(a,b,c,d,x,s,ac) {
			a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
			return AddUnsigned(RotateLeft(a, s), b);
		};

	var II = function(a,b,c,d,x,s,ac) {
			a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
			return AddUnsigned(RotateLeft(a, s), b);
		};

	var ConvertToWordArray = function(str) {
			var lWordCount;
			var lMessageLength = str.length;
			var lNumberOfWords_temp1=lMessageLength + 8;
			var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
			var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
			var lWordArray=Array(lNumberOfWords-1);
			var lBytePosition = 0;
			var lByteCount = 0;
			while ( lByteCount < lMessageLength ) {
				lWordCount = (lByteCount-(lByteCount % 4))/4;
				lBytePosition = (lByteCount % 4)*8;
				lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount)<<lBytePosition));
				lByteCount++;
			}
			lWordCount = (lByteCount-(lByteCount % 4))/4;
			lBytePosition = (lByteCount % 4)*8;
			lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
			lWordArray[lNumberOfWords-2] = lMessageLength<<3;
			lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
			return lWordArray;
		};

	var WordToHex = function(lValue) {
			var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
			for (lCount = 0;lCount<=3;lCount++) {
				lByte = (lValue>>>(lCount*8)) & 255;
				WordToHexValue_temp = "0" + lByte.toString(16);
				WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
			}
			return WordToHexValue;
		};

	var x=Array();
	var k,AA,BB,CC,DD,a,b,c,d;
	var S11=7, S12=12, S13=17, S14=22;
	var S21=5, S22=9 , S23=14, S24=20;
	var S31=4, S32=11, S33=16, S34=23;
	var S41=6, S42=10, S43=15, S44=21;

	str = this.utf8_encode(str);
	x = ConvertToWordArray(str);
	a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

	for (k=0;k<x.length;k+=16) {
		AA=a; BB=b; CC=c; DD=d;
		a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
		d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
		c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
		b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
		a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
		d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
		c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
		b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
		a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
		d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
		c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
		b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
		a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
		d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
		c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
		b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
		a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
		d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
		c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
		b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
		a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
		d=GG(d,a,b,c,x[k+10],S22,0x2441453);
		c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
		b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
		a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
		d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
		c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
		b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
		a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
		d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
		c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
		b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
		a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
		d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
		c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
		b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
		a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
		d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
		c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
		b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
		a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
		d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
		c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
		b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
		a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
		d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
		c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
		b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
		a=II(a,b,c,d,x[k+0], S41,0xF4292244);
		d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
		c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
		b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
		a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
		d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
		c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
		b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
		a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
		d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
		c=II(c,d,a,b,x[k+6], S43,0xA3014314);
		b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
		a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
		d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
		c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
		b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
		a=AddUnsigned(a,AA);
		b=AddUnsigned(b,BB);
		c=AddUnsigned(c,CC);
		d=AddUnsigned(d,DD);
	}

	var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);

	return temp.toLowerCase();
}

function _findInItems(stack, needle, value) {
	var length = stack.length;

	for (var i = 0; i < length; i++) {
		if (typeof stack[i][needle] !== 'undefined' && stack[i][needle] === value) {
			return stack[i];
		}
	}

	return "undefined";
}

function _itemsInHash(stack, key) {
	var output = {};

	var length = stack.length;

	for (var i = 0; i < length; i++) {
		if (typeof stack[i][key] !== 'undefined')
			output[stack[i][key]] = stack[i];
	}

	return output;
}

function bb2html(bb) {
	bb = bb.replace(/(\r\n|\n|\r)/gm, '<br />');

	return bb;
}

/*
	возвращает значение query-параметра адресной строки по его имени
*/
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(window.location.href);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

/*
	получает значения всех полей, к которым применён jquery плагин "bootstrap x-editable" внутри элемента с селектором selector
*/
function xeditableSerialize(selector) {
	var data = {};
	$(selector+" .editable").editable().each(function(item, obj){
		var id = $(obj).attr('id');

		var edit_data = $('#'+id).editable().data().editable;
		if (edit_data.value)
			data[id] = edit_data.value;
	});
	return data;
}

/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (arguments.length > 1 && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setTime(+t + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {};

		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) === undefined) {
			return false;
		}

		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));