var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/sync', function(req, res, next) {
  res.render('sync',{title:'sync'});
});

module.exports = router;
