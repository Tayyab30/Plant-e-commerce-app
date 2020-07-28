const express = require('express');
const router = express.Router();
const passport = require('passport');

const { login , register }= require('../controller/auth');

/* 
@desc : Login user route 
@path : /api/auth/login
@req : { email , password }
*/
router.post('/login',passport.authenticate('local' ,{ session : false } ), login)

/* 
@desc : register user route 
@path : /api/auth/register
@req : { username , email , password }
*/
router.post('/register', register )

module.exports = router;