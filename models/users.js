var mongoose = require("mongoose");
var bcrypt = require('bcryptjs');
mongoose.connect("mongodb://localhost/todolist");

var db = mongoose.connection;

// List Schema
var ListSchema = mongoose.Schema({
    listname : { type: String , unique: true },
    till : {type:Date},
    secret : {type: String, required: true },
    todos : [{ 
		item:{type:String},
		done:{type:Boolean},
		imp:{type:Boolean}
	    }],
});

var List = module.exports = mongoose.model('List',ListSchema);

module.exports.getList = function(listname, callback){
	var query = {listname: listname};
	List.findOne(query, callback);
}

module.exports.compareSecret = function(Secret, hash, callback){
	bcrypt.compare(Secret, hash, function(err, isMatch) {
    	callback(null, isMatch);
	});
}

module.exports.createList = function(newList,callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newList.secret, salt, function(err, hash) {
            newList.secret = hash;
            newList.save(callback);
        });
    });    
}
