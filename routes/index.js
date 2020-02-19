var express = require('express');
var router = express.Router();

const paymentContoller = require('../src/controller/PaymentContoller');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: 'Express'});
});

router.get('/teste', paymentContoller.test);

module.exports = router;
