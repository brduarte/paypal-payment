const axios = require('axios');
const {payPal} = require('../config/AcessServices.exemplo');

const api = axios.create({
    baseURL: payPal.urlPayPal
});

class PayPalService {

    constructor() {
        this.loginPayPal();
    }

    async loginPayPal() {

        try {
            //Usando application/x-www-form-urlencoded format
            const params = new URLSearchParams();
            params.append('grant_type', 'client_credentials');
            const {data} = await api.post(payPal.urlPayPal + '/v1/oauth2/token', params, {
                auth: {
                    username: payPal.username,
                    password: payPal.password,
                },
            });

            api.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;

        } catch (e) {
            throw e;
        }

    }

    async createOrder(value) {

        try {

            const params = {
                intent: "CAPTURE",
                purchase_units: [
                    {
                        "amount": {
                            "currency_code": "BRL",
                            "value": value
                        }
                    }
                ]
            };

            const {data} = await api.post('/v2/checkout/orders', params);

            return data;

        } catch (e) {
            throw e;
        }

    }

    async showOrder(idOrder) {
        try {
            const {data} = await api.get(`/v2/checkout/orders/${idOrder}`);
            return data;
        } catch (e) {
            throw e;
        }
    }

    async capturePayment(idOrder) {
        try {
            api.defaults.headers.post['Content-Type'] = 'application/json';
            const {data} = await api.post(`/v2/checkout/orders/${idOrder}/capture`);
            return data;
        } catch (e) {
            throw e;
        }
    }

}

module.exports = PayPalService;