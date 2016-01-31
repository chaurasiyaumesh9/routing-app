var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var port = process.env.port || 8072;
var crud =  require('./routes/crud');
var fileupload =  require('./routes/fileupload');
//var busboy = require('connect-busboy'); //middleware for form/file upload

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true }));
app.use( express.static( path.join( __dirname + "/public") ) );
//app.use(busboy());


app.use('/crud', crud);
app.use('/fileupload', fileupload);



app.listen(port, function(){
	console.log('site running on port '+port+'.');
});

