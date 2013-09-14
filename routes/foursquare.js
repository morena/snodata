var config = {
	'secrets': {
		'clientId': 'U22HVLIPTSYM1OLH3TKRFUU1MX2ISXPDCIPG42P1GZZ1Z3WA',
		'clientSecret': '5MUR1GFAJ2YMEA2NEIEXPZJHJ3TNVDE1L2CSBFYEH4JNZRMJ',
		'redirectUrl': 'http://localhost:3000/oauth/foursquare/callback'
	}
}

var foursquare = require('node-foursquare')(config);

function _getUserPosition(req,res){
	var id = req.params.id;
	var token = req.session.accessToken;

	console.log(token);

	foursquare.Users.getCheckins(id, {}, token, function(error, results){
		res.writeHead(200, {
			"Content-Type": "application/json"
		});
		res.end(JSON.stringify(results));
	});
}


exports.userPosition = function(req, res) {
	res.end(req.params.userid);
}

exports.login = function(req, res) {
	res.writeHead(303, {
		'location': foursquare.getAuthClientRedirectUrl()
	});
	res.end();
}

exports.callback = function(req, res) {
	foursquare.getAccessToken({
		code: req.query.code
	}, function(error, accessToken) {
		if (error) {
			res.end('An error was thrown: ' + error.message);
		} else {
			// Save the accessToken and redirect.
			//res.end(accessToken);
			req.session.accessToken = accessToken;
			res.end("You are logged in");
		}
	});
}

exports.getPositions = function(req,res){
	var type = req.params.type;

	switch (type){
		case "user":
			_getUserPosition(req,res);
			break;

		default:
			res.end("Method not allowed");
	}

}