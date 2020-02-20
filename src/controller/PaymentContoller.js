const PayPalService = require('../services/PayPalService');

const payPalService = new PayPalService();

class PaymentContoller {

    /*
     * Metodo para criar um order no PayPal e retornar o link de para aprovação do usuário
     */
    static async createOrder(req, res) {

        try {

            const {value} = req.body;

            if (!value || value === 0) throw {
                mensagem: 'Valor não definido ou esta igual a 0.'
            };

            const {id, links, status} = await payPalService.createOrder(value);

            let response = {
                id,
                status,
            };
            links.map((link, index) => {
                if (link.rel === 'approve') {
                    response = {...response, link}
                }
            });

            res.json(response);

        } catch (e) {
            res.json(e);
        }

    }

}

module.exports = PaymentContoller;