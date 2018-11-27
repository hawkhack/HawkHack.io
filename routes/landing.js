var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var gmailUser = 'ramialhussein98@gmail.com';
var gmailPass = 'Hassan111';

router.get('/', (req, res) => {
    res.render('landing', { title: 'landing page' });
    console.log('does this even run?');
});

router.post('/contact', function (req, res) {
    var UserName = req.body.name;
    var UserEmail = req.body.email;
    var Mail = req.body.message;

    var mailOpts, smtpTrans;
    smtpTrans = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: gmailUser,
            pass: gmailPass
        }
    });

    mailOpts = {
        from: UserName + UserEmail,
        to: gmailUser,
        subject: 'test',
        text: Mail
    };

    smtpTrans.sendMail(mailOpts, function(err, res){
        if(err){
            console.log(err);
        }else{
            console.log('mail sent');
        }
    })
})


module.exports = router;