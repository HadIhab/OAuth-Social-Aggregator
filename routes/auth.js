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
		scope: ['profile'
		]
	}));
	
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  })
module.exports = router;		