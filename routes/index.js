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
                value: 2.50
            },
            {
                id: 1,
                value: 2.55
            },
            {
                id: 1,
                value: 2.00
            }
        ],
    )
});

module.exports = router;
