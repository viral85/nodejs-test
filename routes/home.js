const express = require('express');
const router = express.Router();

/**
 * GET request for start demo
 * 
 */
router.get('/', function(req, res, next) {
    res.render('index');
});


module.exports = router;