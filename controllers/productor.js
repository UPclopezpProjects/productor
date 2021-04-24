'use strict'
var axios = require('axios');
var Productor = require('../models/Productors');

function dataTransaction(req, res){
    var productor = new Productor();
    productor.fid = req.body.fid;
    productor.ubication = req.body.ubication;
    productor.name = req.body.name;
    productor.harvestDate = req.body.harvestDate;
    productor.caducationDate = req.body.caducationDate;
    productor.previousStage = req.body.previousStage;
    productor.currentStage = req.body.currentStage;
    productor.description = req.body.description;
    productor.image = req.body.image;
    productor.documentation = req.body.documentation;
    productor.save((err, productorStored) => {
      if(err) {
        res.status(500).send({ message: 'Error al guardar los datos' });
      }else{
        if(!productorStored) {
          res.status(404).send({ message: 'El dato no ha sido guardado' });
        }else{
          serviceInit(productorStored, function(data, err) {
            res.status(200).send({ message: data.message, addData: data.addData });
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
      ubication: productorStored.ubication,
      name: productorStored.name,
      previousStage: productorStored.previousStage,
      currentStage: productorStored.currentStage
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

function getData(req, res) {
  var code = req.body.code;
  console.log(code);
  var query = { id: code };
  Productor.findOne(query, (err, data) => {
    if(err){
      res.status(500).send({message: 'Error en la petición'});
    }else{
      if(!data){
        res.status(200).send({message: null});
      }else{
        res.status(200).send({message: JSON.stringify(data)});
      }
    }
  });
}

module.exports = {
	dataTransaction,
  getData
};
