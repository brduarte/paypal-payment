class MessageService {

    static getMessageStatus(status) {

        try {

            var menssage = '';

            switch (status) {
                case 'CREATED':
                    menssage = 'O pedido foi criado com o contexto especificado.';
                    break;
                case  'SAVED':
                    menssage = 'O pedido foi salvo e persistido. O status do pedido continua em andamento até que seja feita uma captura';
                    break;
                case 'APPROVED':
                    menssage = 'O cliente aprovou o pagamento por meio da carteira do PayPal ou de outra forma de hóspede ou pagamento sem marca. Por exemplo, um cartão, conta bancária ou assim por diante.';
                    break;
                case 'VOIDED':
                    menssage = 'Todas as unidades de compra no pedido são anuladas.';
                    break;
                case  'COMPLETED':
                    menssage = 'O pagamento foi autorizado ou o pagamento autorizado foi capturado para o pedido.';
                    break;
                default: {
                    throw menssage = 'Status não encontrado';
                }
            }

            return {
                menssage,
                status
            }
        } catch (e) {
            throw e;
        }

    }

}


module.exports = MessageService;