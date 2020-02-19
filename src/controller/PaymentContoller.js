const PayPalService = require('../services/PayPalService');

class PaymentContoller {

    constructor(payPalService) {
        payPalService = new PayPalService();
    }

    static test(req, res) {
        res.json('oi bruno maciel');
    }

}

module.exports = PaymentContoller;