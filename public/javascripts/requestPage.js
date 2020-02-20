const api = axios.create({
    baseURL: 'http://localhost:3000'
});

const content = {};
const elements = {
    buttons: {
        btnConfirmar: document.getElementById('btnConfirmar'),
        btnPagar: document.getElementById('btnPagar'),
        btnSincronizar: document.getElementById('btnSincronizar')
    },
    inputs: {
        inputValue: document.getElementById('inputValue')
    }
};

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

    content.value = value.replace(',', '.');
    event.target.value = 'R$' + value;
}

function handleButtomPagar() {
    if (content.order) {
        window.open(content.order.link.href);
    }
}

function handleDisplay() {
    elements.buttons.btnConfirmar.style.display = 'none';
    elements.buttons.btnPagar.style.display = 'block';
    elements.buttons.btnSincronizar.style.display = 'block';
    elements.inputs.inputValue.disabled = true;
}

function handleButtomConfirmar() {
    api.post('/create-order', {value: content.value}).then(response => {
        const {data} = response;

        if (data.status === 'CREATED') {
            content.order = data;
            handleDisplay();
        }
    });
}

function handleButtonSincronizar() {
    api.post('/create-order', {value: content.order.id}).then(response => {
        const {data} = response;
        console.log(data)
    });
}
