var createError = require('http-errors');
var express = require('express');
// const session = require('express-session');
const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catRouter = require('./routes/category');
var branchesRouter = require('./routes/branch');
var toyRouter = require('./routes/toy');
var loginRouter = require('./routes/login');

var app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
// app.use(
//   session({
//     secret: '113521',
//     resave: false,
//     saveUninitialized: true,
//   })
// );
// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
//DB connection
var mongoose = require('mongoose');
var OnlineURL = "mongodb+srv://krumma147:JI3ZFzhQlBZlF8oV@demodb.i3b7ieu.mongodb.net/ToyStore";
var URI = "mongodb://localhost:27017/ToyStore";
mongoose.set('strictQuery', true);
mongoose.connect(OnlineURL)
  .then(()=> console.log("Connect success!"))
  .catch((err)=> console.warn(err))

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended : false}))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// User Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/categories', catRouter);
app.use('/branches', branchesRouter);
app.use('/toys', toyRouter);
app.use('/login', loginRouter);

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

// Start the server
const PORT = process.env.PORT || 3100;
app.listen(PORT, () => {
  console.log(`Server is running on http:localhost:${PORT}`);
});

module.exports = app;
