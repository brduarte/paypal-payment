var express = require('express');
var router = express.Router();

const paymentContoller = require('../src/controller/PaymentContoller');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: 'Express'});
});

router.post('/create-order', paymentContoller.createOrder);
router.post('/sync-payment', paymentContoller.syncPayment);

module.exports = router;
