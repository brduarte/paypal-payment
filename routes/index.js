var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: 'Express'});
});

router.get('/produtos', function (req, res) {
    res.json([
            {
                id: 1,
                product_name: 'Sanduich',
                value: 2.00
            },
            {
                id: 1,
                product_name: 'Ração de Gato',
                value: 2.00
            },
            {
                id: 1,
                product_name: 'Salada de Biscoito',
                value: 2.00
            }
        ],
    )
});

module.exports = router;
