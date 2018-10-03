var express = require('express');
var app = express();
var path = require('path');

var bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, '../fog.steven-meyer/public/')));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var fs = require('fs');

app.get('/', function(request, response){
	console.log('- Request received:', request.method, request.url);
	response.sendFile(path.join(__dirname, '../fog.steven-meyer/public/', 'canopy.html')); 
});

app.post('/', function(request, response){
	console.log('- Request received:', request.method, request.url);

	fs.readFile('words.json', 'utf8', function readFileCallback(err, data){
	    if (err){
	        console.log(err);
	    } else {
		    var obj = JSON.parse(data); 
		    obj.table.push(request.body.text); 
		    json = JSON.stringify(obj); 
		    fs.writeFile('words.json', json, 'utf8',  function(error) {
				if(error) { 
			      console.log('[write auth]: ' + err);
			    } else {
			      console.log('[write auth]: success');
			    }
			}); 
			response.json(obj);
		}
	});
});

/*Sets up the server on port 8080.*/
app.listen(8080, function(){
	console.log('- Server listening on port 8080');
});