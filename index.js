'user strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3005;
var mongoDB = 'mongodb://host.docker.internal:27017/productors';
//var mongoDB = 'mongodb://172.17.0.1:27017/productors';



mongoose.connect(mongoDB, {useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true}, (err, res) => {
	if(err){
		throw err;
	}else{
		console.log("Conexión exitosa (Base de datos)...");
		app.listen(port, function(){
			console.log("Microservicio 'Productor' escuchando en -> http://localhost:"+port);
		});
	}
});
