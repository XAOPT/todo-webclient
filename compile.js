fs = require('fs');

var files = fs.readdirSync('templates');

var templates = [];
var output = "var TEMPLATES = {";

for (var i=0; i<files.length; i++){
	templates[i] = fs.readFileSync('templates/'+files[i], 'utf8');
	templates[i] = templates[i].replace(/(?:\\[rn]|[\r\n]+)+/g, ' \\ \r\n');

    output += files[i]+":"+"'"+templates[i]+"',"
}

output += "}";
fs.writeFileSync("js/templates.js", output);