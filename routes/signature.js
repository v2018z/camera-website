var express = require('express');
var router = express.Router();
var signature = require('../service/signture');

/* GET home page. */
router.get('/', function(req, res, next) {
	var url = req.param('url');
	signature.getSignature(url, function(s){
		s = JSON.stringify(s);
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end(s);
	});
});

module.exports = router;
