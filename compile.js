fs = require('fs');

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