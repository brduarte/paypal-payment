const axios = require('axios');

const acess = {
    urlPayPal: 'https://api.sandbox.paypal.com',
    username: 'AX6aVimi3YCsMecXkFeme7ju8i6C6tX0_HIjdOEWjlbP4WPCz4SsX9Aq_eOSP0EVCVAwGBD114_azRKt',
    password: 'EBb7ZiTEnjHZEWyIBLMK2i24yfHu_3LhunzlJ9jPIXvG6AKho9Vvi66ke68sJ0rfoTttO_sFXrP_10PN'
};

const api = axios.create({
    baseURL: acess.urlPayPal,

});

//--------------- Inicio

start();

async function start() {

    const content = {};

    await loginPayPal(content);

    console.log(content)

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

        content.access = data;

    } catch (e) {
        console.log(e)
    }

}

async