const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

const app = express();
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
	clientID: '30748610964-j7b9tn6eqef652npmohsduuqj5opbilp.apps.googleusercontent.com',
	clientSecret: 'QPx4HqZPnWW_lm1Eq_fqktnO',
	callbackURL: 'http://localhost:3000/auth/google/callback'
	},
	function(req, accessToken, refreshToken, profile, done){
		done(null, profile);
	}
));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  //done(null, user.id);
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  //User.findById(id, function (err, user) {
    done(err, user);
  //});
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth',authRouter);

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
