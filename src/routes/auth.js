import {
    Router
} from 'express';
import {
    catchAsync
} from "../middlewares/errors";
import authController from '../controller/authController';
import passport from 'passport';
import jwtAuth from '../middlewares/auth'

export default () => {

    const api = Router();

    api.post('/register', authController.register);

    api.post('/login', passport.authenticate('local', {
        session: false
    }), authController.login);

    api.post('/token', authController.newtoken);

    api.delete('/logout', authController.logout);

    api.get('/checkToken', jwtAuth, function (req, res) {
        res.sendStatus(200);
    });

    return api;
}