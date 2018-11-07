var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

var url = 'mongodb://Ramial:Dell2314!@cluster0-shard-00-00-tfwgd.gcp.mongodb.net:27017,cluster0-shard-00-01-tfwgd.gcp.mongodb.net:27017,cluster0-shard-00-02-tfwgd.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
var dbname = 'MCC';

/* GET mongotest page. */
router.get('/', function(req, res, next) {
	res.render('mongotest', { title: 'Express' });
});

router.get('/get-data', function(req, res, next){
	var resultArray = []; 							//array for holding collection data
	mongo.connect(url, function(err, client){
		assert.equal(null, err);
		var db = client.db(dbname);
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
		var db = client.db(dbname);
		db.collection('Users').insertOne(item, function(err, result){	//insert item into Users collection
			assert.equal(null, err);
			console.log('Item Inserted');
			client.close();
		});
	});

	res.redirect('/mongotest');
	
});

router.post('/update', function(req, res, next) {
  var item = {
    name: req.body.name,
		email: req.body.email,
  };
  var id = req.body.id;

  mongo.connect(url, function(err, client) {
    assert.equal(null, err);
		var db = client.db(dbname);
    db.collection('Users').updateOne({"_id": objectId(id)}, {$set: item}, function(err, result) {
      assert.equal(null, err);
      console.log('Item updated');
      client.close();
    });
  });
  res.redirect('/mongotest');
});

router.post('/delete', function(req, res, next) {
  var id = req.body.id;

  mongo.connect(url, function(err, client) {
    assert.equal(null, err);
    var db = client.db(dbname);
    db.collection('Users').deleteOne({"_id": objectId(id)}, function(err, result) {
      assert.equal(null, err);
      console.log('Item deleted');
      client.close();
    });
  });
  res.redirect('/mongotest');
});
	
module.exports = router;