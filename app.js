var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var uuid = require('node-uuid');
var jwt = require('jwt-simple');

app.use(bodyParser.json());
app.use(cookieParser());

app.get('/api/authentication', function(req,res){
	res.send('Please use /api/authentication/:user/:password');
});

app.get('/api/authentication/:user/:password', function(req,res){
	console.log('I am inside /api/authentication/:user/:password........1'+req.params.user.toString()+req.params.password.toString());
	var result = '';
	if(req.params.user.toString().trim() != null && req.params.password.toString().trim() != null){
		if(req.params.user.toString().trim() == "pratip.ibm@gmail.com" && req.params.password.toString().trim() == "pratip123"){
			result = "SUCCESS";
		}else{
			result = "LOGIN FAILED!!!!";
		}
	}
	if(req.params.user.toString().trim() == "null"){
		result = "Please input a userId. It cann't be blank";
	}
	if(req.params.password.toString().trim() == "null"){
		result = "Please input a password. It cann't be blank";
	}
	var secretKey = uuid.v4();
	console.log(secretKey);
	var tokenValue = jwt.encode(req.params.password.toString(), secretKey);
	console.log(tokenValue);
	res.cookie('token', tokenValue, { maxAge: 900000, httpOnly: false });
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	//res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Headers","*");
	
	console.log(result);
	//res.send(JSON.stringify(result));
	//res.send(result);
	res.status(200).send({result, token: tokenValue});
});

app.listen(3000);
console.log('Running on port 3000.....');