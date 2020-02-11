const axios = require('axios');

const acess = {
    urlPayPal: 'https://api.sandbox.paypal.com',
    username: 'Ae_Ghn2r6iRC1nD5FEoYW8ODjC1CwrLDXqu-dNkc6JowQbmq7o3MTwn9Uq4G34zEhGdZsXXwM07HK5Db',
    password: 'EH9IUi88cLj4YhRPUH6U4CwNotUJnjJw7_fJwHzrdguOViTMWVakJcDZlCxGcFnZyxNyiURdjbsgSHVu'
};

const api = axios.create({
    baseURL: acess.urlPayPal,
});

//--------------- Inicio

start();

async function start() {

    const content = {};

    await loginPayPal(content);
    await showOrders();
    // await authorizePayment()

    // console.log(content)

}

//---------------- Final

async function loginPayPal(content) {

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
        content.access = data;

    } catch (e) {
        console.log(e)
    }

}

async function createOrder(content) {

    try {

        const params = {
            intent: "AUTHORIZE",
            purchase_units: [
                {
                    "amount": {
                        "currency_code": "BRL",
                        "value": "1.00"
                    }
                }
            ]
        };

        const {data} = await api.post('/v2/checkout/orders', params);

        content.order = data;

    } catch (e) {
        console.log(e)
    }

}

async function showOrders() {

    try {

        const {data} = await api.get('/v2/checkout/orders/9A9973155P078244N');
        console.log(data.purchase_units)

        // content.order = data;

    } catch (e) {
        console.log(e)
    }

}

// async function authorizePayment() {
//
//     try {
//
//         const {data} = await api.get(`/v2/checkout/orders/9A9973155P078244N/authorize`);
//         console.log(data)
//
//         // content.order = data;
//
//     } catch (e) {
//         console.log(e)
//     }
//
// }


