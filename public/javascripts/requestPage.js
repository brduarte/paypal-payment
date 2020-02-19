const api = axios.create({
    baseURL: 'http://localhost:3000'
});

start();

async function start() {
    const content = {};
}

function handleInputValue(event) {
    let value = event.target.value;
    value = value.replace('R$', '');

    console.log(value.length)

    event.target.value = '';
    event.target.value = 'R$' + value;
}

