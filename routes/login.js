var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var assert = require('assert');
const bcrypt = require('bcrypt');

var url = 'mongodb://Ramial:Dell2314!@cluster0-shard-00-00-tfwgd.gcp.mongodb.net:27017,cluster0-shard-00-01-tfwgd.gcp.mongodb.net:27017,cluster0-shard-00-02-tfwgd.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';

router.get('/', function (req, res, next) {
	res.render('login', { title: 'LogIn MCC' });
});

router.get('/access', function (req, res) {
	password = req.body.password;
	mongo.connect(url, function (err, client) {
		assert.equal(null, err);
		var db = client.db('MCC');
		db.collection('Users').findOne({}, function (err, result) {
			assert.equal(null, err);
			console.log(result.email);
			console.log(result.password);

			DbPassword = result.password;
			
			if (password = DbPassword) {
				console.log('true');
			}
			else {
				console.log('false');
			}
		})
	})
})

module.exports = router;