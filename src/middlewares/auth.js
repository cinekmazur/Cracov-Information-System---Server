//adding comments just for logged users

import passport from 'passport'; //passport.js

export default (req, res, next) => {
    return passport.authenticate('jwt', {
        session: false
    })(
        req, res, next);
}
