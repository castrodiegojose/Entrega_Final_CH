import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import {logger, loggWarningFile} from '../utils/logger.js'
import {enviarMail} from '../utils/nodeMailer.js'


passport.serializeUser((user, done)=>{
    done(null, user.id);
});
passport.deserializeUser(async (id, done)=>{
    const user = await User.findById(id);
    done(null, user);
});


passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
}, async (req, email, password, done) => {        
        const userExist = await User.findOne({email: email})
    if (userExist) {
        return done(null, false, req.flash('signupMessage', 'The Email is already taken.'));
    }
    else{
        const newUser = new User();
        newUser.email = email;
        newUser.name = req.body.name
        newUser.age = req.body.age
        newUser.address = req.body.address
        newUser.phoneNumber = req.body.phone
        newUser.photo = '../public/avatars/'+req.file.originalname
        newUser.password = newUser.encryptPassword(password);
        await newUser.save();
        enviarMail(newUser)
        logger.info("Usuario Agregado")
        return done(null, newUser)
    }
}));

passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
}, async (req, email, password, done) => {
    const userExist = await User.findOne({email: email})
    if (!userExist) {
        loggWarningFile.warn("user desn't exist")
        return done(null, false, req.flash('loginMessage', 'No user found'));
    }
    const passOK = await bcrypt.compare(password, userExist.password)
    if(!passOK){
        loggWarningFile.warn("bad password")
        return done(null, false, req.flash('loginMessage', 'Password Incorrecta'));
    }
    return done(null,userExist)
}));