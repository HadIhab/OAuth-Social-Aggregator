const express = require('express');
const passport = require('passport');
const router = express.Router();

router.route('/google/callback')
	.get(passport.authenticate('google',{
		successRedirect: '/users/',
		failure: '/error/'
	}));

router.route('/google')
	.get(passport.authenticate('google',{
		scope: ['https://www.googleapi.com/auth/userinfo.profile'
				'https://www.googleapi.com/auth/userinfo.email'
		]
	}));

module.exports = router;		