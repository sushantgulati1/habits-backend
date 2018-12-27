var express = require('express');
var router = express.Router();

var flash = require('connect-flash');
var List = require("../models/users");

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

/* GET */
router.get('/sync', function(req, res, next) {
  
});


router.post('/sync', function(req, res, next) {
  var listname = req.body.listname;
  var secret = req.body.secret;
  // Validations 
  req.checkBody('listname', 'Listname field is required').notEmpty();
  req.checkBody('secret', 'Secret field is required').notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    console.log(errors);
  } else {
    var newList = new List({
      listname: name,
      secret: secret
    });

    List.createList(newList, function (err, list) {
      if (err) {
        return err;
      }
      else {
        console.log('list added');
      }
    });

    res.redirect('/');
  }
});

passport.use(new LocalStrategy(function(listname, secret, done){
  List.getList(listname, function(err, list){
    if(err) throw err;
    if(!list){
      return done(null, false, {messages: 'Unknown list'});
    }

    List.compareSecret(secret, list.secret, function(err, isMatch){
      if(err) return done(err);
      if(isMatch){
        return done(null, list);
      } else {
        return done(null, false, {messages:'Invalid secret'});
      }
    });
  });
}));

module.exports = router;
