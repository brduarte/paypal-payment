const PayPalService = require('../services/PayPalService');

const payPalService = new PayPalService();

async function createOrder(req, res) {
    // const response = await payPalService.createOrder('1.00');
    res.json('response');
}


module.exports = {
    createOrder,
};