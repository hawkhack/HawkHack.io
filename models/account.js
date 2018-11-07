var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    email: String,
    password: String,
    shirtSize: String,
	secQ: String,
	sqcQA: String
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);