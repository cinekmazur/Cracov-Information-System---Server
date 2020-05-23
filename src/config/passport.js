import passport from 'passport';
import passportJWT from 'passport-jwt'
import User from '../models/userModel';

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

//methot using for extract tokens, imported from passportJWT

// this function veryfiy user by token
function verifyCallback(payload, done) {
    return User.findOne({
        _id: payload.id
    }).then(user => {
        return done(null, user);
    }).catch(err => {
        return done(err);
    });
}

export default () => {
    //object config for adding comment for logged user:
    const config = {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.ACCESS_TOKEN_SECRET
    };


    passport.use(User.createStrategy());
    passport.use(new JWTStrategy(config, verifyCallback));

}