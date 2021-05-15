'use strict'

var express = require('express');
var router = express.Router();
var ProductorController = require('../controllers/productor');
//var md_auth = require('../middlewares/authenticated');

router.post('/productorsData', ProductorController.dataTransaction);
router.post('/dataOfCompany', ProductorController.dataOfCompany);
router.get('/getData', ProductorController.getData);
router.post('/getCompany', ProductorController.getCompany);

module.exports = router;
