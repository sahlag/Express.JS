var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{
    title: "Page d'accueil",
    name:"souheil"

  });
  
});
router.get('/accueil2', function(req, res, next) {
  res.render('index',{
    name:"souheil"

  });
  
});

module.exports = router;
