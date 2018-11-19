var express = require('express');
var router = express.Router();

router.get('/', (req, res)=>{
    res.render('landing', {title: 'landing page'});
    console.log('does this even run?');
});

module.exports = router;