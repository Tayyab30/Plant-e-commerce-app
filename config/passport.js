const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcryptjs');

const User = require("../models/user");

passport.use( new LocalStrategy({
    usernameField : "usernameOrEmail"
},
   async ( usernameOrEmail , password , done  ) => { 
       try { 
        const user = await  User.findOne().or([{ email : usernameOrEmail} , { username : usernameOrEmail}])
        if( !user ) { return done(null , false ); }

        const isValidPassword = await bcrypt.compare(password , user.password);

        if(!isValidPassword) { return done(null , false);}

        return done(null , user );


       }catch( err ) { 
          return  done(null , false )
       }
    }
))


passport.serializeUser((user , done ) => { 
    done(null , user.id );
})

passport.deserializeUser(( id , done ) => { 
    User.findById(id, function (err , user ) { 
        done( err , user  );
    })
})