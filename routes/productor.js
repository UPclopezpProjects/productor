'use strict'

var express = require('express');
var ProductorController = require('../controllers/productor');
var router = express.Router();
//var md_auth = require('../middlewares/authenticated');

router.post('/productorsData', ProductorController.dataTransaction);
router.get('/getData', ProductorController.getData);

module.exports = router;
