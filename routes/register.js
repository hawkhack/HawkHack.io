var express = require('express');
var router = express.Router();
//var mongo = require('mongodb').MongoClient;
var assert = require('assert');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var passport = require('passport');
var Account = require('../models/account');
var LocalStrategy = require('passport-local').Strategy;

//var url = 'mongodb://Ramial:Dell2314!@cluster0-shard-00-00-tfwgd.gcp.mongodb.net:27017,cluster0-shard-00-01-tfwgd.gcp.mongodb.net:27017,cluster0-shard-00-02-tfwgd.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';

router.get('/', function (req, res, next) {
	res.render('register', { title: 'Register to MCC' });
});


router.post('/insert', function(req, res) {
    Account.register(new Account({ firstName: req.body.firstName,
						lastName: req.body.lastName,
						email: req.body.email,
						shirtSize: req.body.txtShirtSize,
						secQ: req.body.secQ,
						sqcQA: req.body.secQA }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});


// router.post('/insert', function (req, res, next) {
// 	// PBDKF2 PASSWORD BASED DERVITAVIE KEY FUNCTION
// 	// A FUNCTION THAT TAKES A PASSWORD AS SEED AND GENERATE A KEY BASED ON THAT PASSOWRD THAT KEY IS USED TO HASH THE PASSWORD
// 	//trying to hash password 1 , and 2
// 	bcrypt.genSalt(saltRounds, function (err, salt) {
// 		var password = req.body.password1;
// 		bcrypt.hash(password, salt, function (err, hash) {
// 			var item = {
// 				firstName: req.body.firstName,
// 				lastName: req.body.lastName,
// 				email: req.body.email,
// 				password: hash,
// 				shirtSize: req.body.txtShirtSize,
// 				secQ: req.body.secQ,
// 				sqcQA: req.body.secQA
// 			}
// 			console.log(item);

// 			mongo.connect(url, { useNewUrlParser: true }, function (err, client) {
// 				assert.equal(null, err);
// 				var db = client.db('MCC');
// 				db.collection('Users').insertOne(item, function (err, result) {	//insert item into Users collection
// 					assert.equal(null, err);
// 					console.log('Item Inserted');
// 					client.close();
// 				});
// 			});

// 		})
// 	})
// 	res.redirect('/register');
// });

module.exports = router;