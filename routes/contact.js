var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');

router.get('/', function(req, res, next){
	res.render('contact');
});

router.use(bodyParser.urlencoded({extended : true}));

router.post('/contact', (req, res) =>{
    let mailOpts, smtpTrans;
    GMAIL_PASS = 'Password';
    GMAIL_USER = 'Ramialhussein98@gmail.com'
    smtpTrans = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: GMAIL_USER,
            pass: GMAIL_PASS,
        }
    });
    mailOpts = {
        from : req.body.name + '&lt' + req.body.email + '&lt',
        to : GMAIL_USER,
        subject: 'New Msg from HackHawk.io',
    }
})

module.exports = router;