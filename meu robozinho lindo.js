const axios = require('axios');
const inquirer = require('inquirer');

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

    const content = {
        interaction: {
            isStart: null,
            isCreate: false,
            isFinanced: false,
            isAuthorized: false,
            orderValue: 0.00
        }
    };

    const prompt = inquirer.createPromptModule();

    const response1 = await prompt({
        type: 'rawlist',
        name: 'value',
        message: 'Iniciando pagamento PayPal.',
        choices: [
            {
                name: 'Fazer Pagamento',
                value: true
            },
            {
                name: 'Cancelar',
                value: false
            }
        ]
    });
    content.interaction.isStart = response1.value;

    if (content.interaction.isStart) {

        await loginPayPal(content);
        const response = await prompt({
            type: 'number',
            name: 'value',
            message: 'Informe o valor da compra. R$0.00'
        });
        content.interaction.orderValue = response.value;

        await createOrder(content);


        while (!content.interaction.isFinish) {

            if (content.interaction.isCreate) {
                console.log('Falta pouco para receber seu pagamento.');
                console.log(`Aprove o pagamento pelo link: ${showLinkApprove(content)}`);
            }

            const response2 = await prompt({
                type: 'list',
                name: 'value',
                message: 'Pagamento autorizado?',
                choices: [
                    {
                        name: 'Sim',
                        value: true
                    },
                    {
                        name: 'Não',
                        value: false
                    }
                ]
            });

            const status = await showStatusOrder(content);

            if (status == "APPROVED") {
                await capturePayment(content);
            }

        }

    }


    // await capturePayment();
    // await showOrders(content);

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
            intent: "CAPTURE",
            purchase_units: [
                {
                    "amount": {
                        "currency_code": "BRL",
                        "value": content.interaction.orderValue
                    }
                }
            ]
        };

        const {data} = await api.post('/v2/checkout/orders', params);
        content.order = data;
        content.interaction.isCreate = true;

    } catch (e) {
        console.log(e)
    }

}

async function showStatusOrder(content) {

    try {

        const {data} = await api.get(`/v2/checkout/orders/51055589C9161644S`);

        return data.status;

    } catch (e) {
        console.log(e)
    }

}

async function capturePayment(content) {

    try {

        api.defaults.headers.post['Content-Type'] = 'application/json';
        const {data} = await api.post(`/v2/checkout/orders/${content.order.id}/capture`);

        console.log('Pagamento realizado com sucesso');

        content.interaction.isFinanced = true;

    } catch (e) {
        console.log(e)
    }

}

function showLinkApprove(content) {
    const url = `https://www.sandbox.paypal.com/checkoutnow?token=${content.order.id}`;
    return url;
}



