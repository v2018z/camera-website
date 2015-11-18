var rp = require('request-promise');
var sign = require('../utils/sign');

var appid = 'wxd1a5059f8643d582';

var getAccessToken = function(){
	var uri = 'https://api.weixin.qq.com/cgi-bin/token';
	var options = {
		uri: uri,
		qs: {
			'grant_type': 'client_credential',
			'appid': appid,
			'secret': 'd4624c36b6795d1d99dcf0547af5443d'
		},
		json: true
	};
	return rp(options).then(function (response){
		return response.access_token;
	});
}

var getJsApiTicket = function(access_token){
	var uri = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket';
	var options = {
		uri: uri,
		qs: {
			'access_token': access_token,
			'type': 'jsapi'
		},
		json: true
	};
	return rp(options).then(function (response){
		return response.ticket;
	});
}

var getSign = function(url, jsapi_ticket){
	console.log(url)
	return sign(jsapi_ticket, url);
}

var getSignature = function(url, fn){
	var sign = '124'
	getAccessToken()
	.then(function(access_token){
		return getJsApiTicket(access_token);
	}).then(function(ticket){
		sign = getSign(url, ticket);
		sign.appId = appid;
		fn(sign);
	});
}


exports.getSignature = getSignature