var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://hhiotest:hhiopw@hhiotest-shard-00-00-ljgmt.mongodb.net:27017,hhiotest-shard-00-01-ljgmt.mongodb.net:27017,hhiotest-shard-00-02-ljgmt.mongodb.net:27017?ssl=true&replicaSet=hhiotest-shard-0&authSource=admin&retryWrites=true'

/* GET mongotest page. */
router.get('/', function(req, res, next) {
	res.render('mongotest', { title: 'Express' });
});

router.get('/get-data', function(req, res, next){
	var resultArray = []; 							//array for holding collection data
	mongo.connect(url, function(err, client){
		assert.equal(null, err);
		var db = client.db('HawkHackIO');
		var cursor = db.collection('Users').find(); //var containing data from the collection
		cursor.forEach(function(doc, err){ 			//iterating through data
			assert.equal(null, err);
			resultArray.push(doc); 					//storing each into array
		}, function(){								//callback function after foreach is done (due to async)
			client.close();
			res.render('mongotest', {items: resultArray});
		});
	});
});

router.post('/insert', function(req, res, next){
	var item = {								//var storing input data
		name: req.body.name,
		email: req.body.email,
	};

	mongo.connect(url, function(err, client){
		assert.equal(null, err);
		var db = client.db('HawkHackIO');
		db.collection('Users').insertOne(item, function(err, result){	//insert item into Users collection
			assert.equal(null, err);
			console.log('Item Inserted');
			client.close();
		});
	});

	res.redirect('/mongotest');
	
});

router.post('/update', function(req, res, next){
	
});

router.post('/delete', function(req, res, next){
	
});
	
module.exports = router;
