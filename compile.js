var fs = require('fs');
var uglify = require("uglify-js");

/* compile doT templates */
var files = fs.readdirSync('templates');

var templates = [];
var output = "var TEMPLATES = { \r\n\t";

for (var i=0; i<files.length; i++){
	templates[i] = fs.readFileSync('templates/'+files[i], 'utf8');
	templates[i] = templates[i].replace(/(?:\\[rn]|[\r\n]+)+/g, ' \\\r\n');
	templates[i] = templates[i].replace(/'/g, '"');

	files[i] = files[i].replace(/\.[^/.]+$/, "");

    output += files[i]+": ' \\\r\n"+templates[i]+"', \r\n "
}

output += "}";
fs.writeFileSync("js/templates.js", output);


var walkSync = function(dir, filelist) {
	var fs = fs || require('fs'),
		files = fs.readdirSync(dir);

	filelist = filelist || [];
	files.forEach(function(file) {
		if (fs.statSync(dir + file).isDirectory()) {
			filelist = walkSync(dir + file + '/', filelist);
		}
		else {
			filelist.push(dir+file);
		}
	});

	return filelist;
};

/* compile JS */

var jsFiles = [
	"js/jquery-2.1.1.min.js",
	"js/bootstrap.min.js",
	"js/less.min.js",
	"js/bootstrap-dialog.js",
	"js/bootstrap-editable.min.js",
	"js/doT.js",
	"js/todo-api.js",
	"js/todo.js",
	"js/templates.js",
	"js/page_timesheet.js",
	"js/page_users.js",
	"js/page_projects.js",
	"js/page_role.js",
	"js/page_report.js",
	"js/bootstrap-colorpicker.js",
	"js/dropzone.js",
	"js/bootstrap-growl.min.js",
	"js/bootstrap-datepicker.js",

	"js/summernote/codemirror.js",
	"js/summernote/formatting.min.js",
	"js/summernote/summernote.min.js",
];

var uglified = uglify.minify(jsFiles);

fs.writeFile('js/concat.min.js', uglified.code, function (err){
	if(err)
		console.log(err);
})

/* compile LESS */

var less = require('less');
var lessFiles = walkSync('css/');
var compiled = '';

fs.existsSync('css/concat.min.css', function(){
	fs.unlinkSync('css/concat.min.css');
});

lessFiles.forEach(function(file){
	fs.readFile(file, function(error, data) {
		var dataString = data.toString();
		less.render(dataString,
			{
				paths: ['./css'],        // Specify search paths for @import directives
				compress: true       // Minify CSS output
			},
			function (e, output) {
				fs.appendFile('css/concat.min.css', output.css, function (err){
					if(err)
						console.log(err);
				})
			}
		);
	});
});
