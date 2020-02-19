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
    value = value.replace(',', '');
    value = parseInt(+value, 10);
    value = value.toString();

    event.target.value = '';

    var tecla = event.keyCode;
    if (tecla > 65 && tecla < 90) {
        return;
    }

    switch (value.length) {
        case 1:
            value = '0,0' + value;
            break;
        case 2:
            value = '0,' + value;
            break;
        case 3:
            value = value.split('');
            value.map((vl, index) => {
                if (index === 0) {
                    value = vl + ',';
                } else {
                    value += vl;
                }
            });
            break;
        case 4:
            value = value.split('');
            value = value.slice(0, 2).toString().replace(',', '') + ',' +
                value.slice(2, 4).toString().replace(',', '');
            break;
        case 5:
            value = value.split('');
            value = value.slice(0, 3).toString().replace(/[,]+/g, '') + ',' +
                value.slice(3, 5).toString().replace(/[,]/g, '');
            break;
        case 6:
            value = value.split('');
            value = value.slice(0, 4).toString().replace(/[,]+/g, '') + ',' +
                value.slice(4, 6).toString().replace(/[,]/g, '');
            break;
    }

    event.target.value = 'R$' + value;
}

