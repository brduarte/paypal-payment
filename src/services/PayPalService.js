const api = require('axios');

const acess = {
    urlPayPal: 'https://api.sandbox.paypal.com',
    username: 'Ae_Ghn2r6iRC1nD5FEoYW8ODjC1CwrLDXqu-dNkc6JowQbmq7o3MTwn9Uq4G34zEhGdZsXXwM07HK5Db',
    password: 'EH9IUi88cLj4YhRPUH6U4CwNotUJnjJw7_fJwHzrdguOViTMWVakJcDZlCxGcFnZyxNyiURdjbsgSHVu'
};

api.create({
    baseURL: acess.urlPayPal,
});

class PayPalService {

    constructor() {
        console.log('oi bruno')
        this.loginPayPal();
    }

    async loginPayPal() {

        try {

            //Usando application/x-www-form-urlencoded format
            const params = new URLSearchParams();
            params.append('grant_type', 'client_credentials');
            const {data} = await api.post('/v1/oauth2/token', params, {
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

}

module.exports = PayPalService;
