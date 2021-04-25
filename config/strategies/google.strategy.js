const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function() {
	passport.use(new GoogleStrategy({

		clientID: '55210986752-55s41dbk9ierd1p1r0tnvlev3jkp82dr.apps.googleusercontent.com',
		clientSecret: 'NRTvnc33gNp7VqH11gEElapo',
		callbackURL: 'http://localhost:3000/auth/google/callback'
		},
		function(req, accessToken, refreshToken, profile, done){
			const user = {};
			user.email = profile.emails[0].value;
			user.image = profile._json.image.url;
			user.displayName = profile.displayName;

			user.google = {};
			user.google.id = profile.id;
			user.google.token = accessToken;

			done(null, user);
		}
	));

}