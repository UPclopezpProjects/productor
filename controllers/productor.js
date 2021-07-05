'use strict'
var axios = require('axios');
var Productor = require('../models/Productors');
var User = require('../models/Users');

function dataTransaction(req, res){
  var productor = new Productor();
  productor.fid = req.body.fid;
  productor.code = req.body.code;
  productor.ubication = req.body.ubication;
  productor.name = req.body.name;
  productor.harvestDate = req.body.harvestDate;
  productor.caducationDate = req.body.caducationDate;
  productor.previousStage = req.body.previousStage;
  productor.currentStage = req.body.currentStage;
  productor.description = req.body.description;
  productor.image = req.body.image;
  productor.documentation = req.body.documentation;
  productor.nameOfCompany = req.body.nameOfCompany;
  productor.save((err, productorStored) => {
    if(err) {
      //console.log(err);
      res.status(500).send({ message: 'Error al guardar los datos' });
    }else{
      if(!productorStored) {
        res.status(404).send({ message: 'El dato no ha sido guardado' });
      }else{
        serviceInit(productorStored, function(data, err) {
          //console.log(dataAWS);
          res.status(200).send({ message: data.message, addData: data.addData, info: data.info });
        });
      }
    }
  });
}

function serviceInit(productorStored, next) {
  var url = 'http://'+host+':'+port.traceability+''+path.traceability+'';
    axios.post(url, {
      id: productorStored._id,
      fid: productorStored.fid,
      code: productorStored.code,
      ubication: productorStored.ubication,
      name: productorStored.name,
      previousStage: productorStored.previousStage,
      currentStage: productorStored.currentStage,
      image: productorStored.image,
      description: productorStored.description
    })
    .then(response => {
        //console.log(response.data);
        next(response.data, null);
    })
    .catch(error => {
        console.log(error);
        next(null, error);
    });
}

function dataOfCompany(req, res) {
  var user = new User();
  user.email = req.body.email;
  user.nameOfCompany = req.body.nameOfCompany;
  user.save((err, userStored) => {
    if(err) {
      console.log(err);
      res.status(500).send({ message: 'Error al guardar los datos para el usuario' });
    }else{
      if(!userStored) {
        res.status(404).send({ message: 'El dato no ha sido guardado para el usuario' });
      }else{
        res.status(200).send({ message: true, user: userStored });
      }
    }
  });
}

function getCompany(req, res) {
  User.findOne({email: req.body.email}, (err, userStored) => {
    if(err){
      res.status(500).send({message: 'Error en la petición'});
    }else{
      if(!userStored){
        res.status(200).send({message: null});
      }else{
        res.status(200).send({message: userStored});
      }
    }
  });
}

function getData(req, res) {
  Productor.find((err, productorStored) => {
    if(err){
      res.status(500).send({message: 'Error en la petición'});
    }else{
      if(!productorStored){
        res.status(200).send({message: null});
      }else{
        res.status(200).send({message: productorStored});
      }
    }
  });
}

module.exports = {
	dataTransaction,
  dataOfCompany,
  getCompany,
  getData
};
