const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const Users = require('../models/userModel')

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
        const user = await Users.findOne({ email });

        if( !user ){
            return done(null, false, { msg: "User not found." })
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch){
            return done(null, false, { msg: "Wrong credentials." })            
        }

        return done(null, user)
    } 
    catch (error) {
        console.error(error);
        return done(error)
    }
}));






module.exports = passport