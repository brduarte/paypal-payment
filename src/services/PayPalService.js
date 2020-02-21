const axios = require('axios');

const acess = {
    urlPayPal: 'https://api.sandbox.paypal.com',
    username: 'AW533V1aK0mHQhlqcJ9bi6XuUzOBQTJYNW7ttrDSg2Y87HlNu7YQ_Pu1KhImqZc5vbf9s2XtCQ2U8ydz',
    password: 'EFQ5i7d3rgxDNeRCTU2AihSsm7Dwgsb-HcKF1SK6uVVVM0CB265kgcWNRTC5xwpam9xPWh3vTPTyC4P1'
};

const api = axios.create({
    baseURL: acess.urlPayPal
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
            const {data} = await api.post(acess.urlPayPal + '/v1/oauth2/token', params, {
                auth: {
                    username: acess.username,
                    password: acess.password,
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