const passport = require('passport');

module.exports = function (app) {

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

	require('./strategies/google.strategy')();
}