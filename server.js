var express = require('express');
var path = require('path');
var open = require('open');

var PORT = 5001;

var app = express();

app.use('/', express.static(__dirname));
app.use('/static', express.static(path.join(__dirname, '/public/**/*')));
app.use(express.static(path.join(__dirname, 'node_modules/core-js/**/*')));
app.use(express.static(path.join(__dirname, 'node_modules/zone-js/**/*')));
app.use(express.static(path.join(__dirname, 'node_modules/systemjs/**/*')));


app.listen(PORT, function (err) {
    if (err) {
        console.log('err');
    }
    else {
        console.log('server listening on port: ' + PORT);
        open('http://localhost:' + PORT, 'firefox');
    }
});