var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//création d'un route avec GET
app.get('/contact',(req, res) =>{
res.send("<h1>bienvenue sur la page de contact</h1>")
});

//création d'un route avec PUT
app.put('/about',(req, res) =>{
const monObjet = {"title" : "About"};
const monObjetString = JSON.stringify(monObjet);
res.send(monObjetString);
});
// Création d'un produit

app.route('/produit/creation')
.get((req, res) =>{
 res.send(`Formulaire nouveau produit
 <form method="post">
 <label for="name">Nom du produit</label>
 <input type="text" name="name" id="name" />
 <input type="submit" value="Créer" />
 </form>
 `);
})
.post((req, res) =>{
  res.send('Produit créé');
});


app.put('/produit/Modification', (req, res) =>{
  res.send('produit modifier');
});
app.delete('/produit/suppression', (req, res) =>{
  res.send('Produit supprimé');
});

app.get('/produit/detail',(req, res, next)=>{
  console.log("[spy]: Accès au detail du produit");
   // on passe au middleware suivant
   next();
},(req, res, )=>{
  res.send('<h1>Detait du produit');
}

);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
