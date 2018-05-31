let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let productRouter = require ('./routes/products');

let app = express();

// D'finition du moteur de vues
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middlewares de base
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// rendre des assets: CSS/JS/IMG/FONTS.
app.use(express.static(path.join(__dirname, 'public')));
app.use('/dist', express.static(path.join(__dirname,'node_modules/jquery/dist')));
app.use('/dist', express.static(path.join(__dirname,'node_modules/bootstrap/dist')));

//Systéme de routage
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/produit',productRouter);

//création d'un route avec GET
app.get('/contact',(req, res) =>{
res.send("<h1>bienvenue sur la page de contact</h1>")
});

//création d'un route avec PUT
app.get('/about',(req, res) =>{
const monObjet = {"title" : "About"};
//const monObjetString = JSON.stringify(monObjet);
//res.send(monObjetString);
res.json(monObjet);
});

app.get(/(ba)+r+$/,(req, res)=>{
  res.send('URL catched !');
});

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
