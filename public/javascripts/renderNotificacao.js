function notifyError(message) {
    let template =
        `<div class="notify n-error">
        <p>${message}</p>
    </div>`;

    return template;
}

function notifyWarning(message) {
    let template =
        `<div class="notify n-warning">
        <p>${message}</p>
    </div>`;

    return template;
}

function notifySuccess(message) {
    let template =
        `<div class="notify n-success">
        <p>${message}</p>
    </div>`;

    return template;
}

function notify(notify) {

    let displayNotificacao = document.getElementById('notificacao');

    switch (notify.type) {
        case 'success':
            displayNotificacao.innerHTML = notifySuccess(notify.message);
            break;
        case 'warning':
            displayNotificacao.innerHTML = notifyWarning(notify.message);
            break;
        case 'error':
            displayNotificacao.innerHTML = notifyError(notify.message);
            break;
    }

    displayNotificacao.style.display = 'block';
    setTimeout( function () {
        displayNotificacao.innerHTML = '';
        displayNotificacao.style.display = 'none';
    }, 3000);

}