//actions responsible for register users

//import user model:
import User from '../models/userModel';
import jwt from 'jsonwebtoken';
//var blacklist = require('express-jwt-blacklist');
//import jwt from 'express-jwt';
//import expressJWT from 'express-jwt';
let refreshTokens = []
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '2h'
    })
}
//controller action:
export default {
    // action-generate token and returning to user:
    async login(req, res, next) {
        // generate token
        const user = {
            id: req.user._id,
            email: req.user.email,
            first_name: req.user.first_name,
            last_name: req.user.last_name,
        }
        const token = generateAccessToken(user);
        //const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
        //refreshTokens.push(refreshToken)

        res.json({
            token,
            //     refreshToken: refreshToken,
            //     //refreshTokens: refreshTokens,
        })

        //res.cookie('token', token, { httpOnly: true }).sendStatus(200);
        //res.status(200).send({ token });
    },

    async register(req, res, next) {
        const {
            first_name,
            last_name,
            email,
            password
        } = req.body; //reading sent data
        const user = new User({
            first_name,
            last_name,
            email
        }); //create of new user
        await User.register(user, password) //set user's password using method register

        res.send({
            message: ' User created successfully. Now you can log in. '
        })
    },

    async logout(req, res) {
        refreshTokens = refreshTokens.filter(token => token !== req.body.token)
        res.json({
            refreshTokens: refreshTokens
        })
    },

    async newtoken(req, res) { // new refresh Token
        const refreshToken = req.body.token
        if (refreshToken == null) return res.sendStatus(401) //unauthorized
        if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403) //forbidden
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403)
            const accessToken = generateAccessToken({
                name: user.name
            })
            res.json({
                accessToken: accessToken
            })
        })
    }

}