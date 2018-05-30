let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let productRouter = require ('./routes/products');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Systéme de routage
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/produit',productRouter);

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

// Modifier un produit
app.put('/produit/Modification', (req, res) =>{
  res.send('produit modifier');
});
// suppremer un produit
app.delete('/produit/suppression', (req, res) =>{
  res.send('Produit supprimé');
});
// utilisation de plusieur callbacks.
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
