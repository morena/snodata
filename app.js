
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var oauth = require('./routes/oauth');
var positions = require('./routes/positions');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
//.get('/:userid', routes.index);
app.get('/oauth/:service/callback', oauth.callback);
app.get('/oauth/:service/login', oauth.login);
app.get('/positions/:service/:type/:id', positions.getPositions);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
