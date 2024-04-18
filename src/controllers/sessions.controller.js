import * as usersService from '../services/users.service.js';
import { UserAlreadyExists, InvalidCredentials } from "../utils/custom.exceptions.js";
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const singUp = async (req, res) => {
    try {
        const { first_name ,last_name, email, password } = req.body;
        if(!first_name || !last_name || !email || !password) return res.sendClientError('incomplete values');
        const registeredUser = await usersService.register({ ...req.body });
        res.sendSuccessNewResourse(registeredUser);
    } catch (error) {
        if(error instanceof UserAlreadyExists) {
            return res.sendClientError(error.message);
        }
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if( !email || !password) return res.sendClientError('incomplete values');
        const accessToken = await usersService.login(password, email);
        res.cookie('TokenJWT', accessToken, { maxAge: 60 * 60 * 1000 }).sendSuccess(accessToken);
    } catch (error) {
        if(error instanceof InvalidCredentials) {
            return res.sendClientError(error.message);
        }
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const logout = async (req, res) => {
    try {
        req.user.last_connection = new Date().toLocaleString();
        await usersService.update(req.user._id, req.user)
        res.clearCookie('TokenJWT').sendSuccess('El usuario ha finalizado la sesión');
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const current = async(req,res) =>{
    try {
        const cookie = req.cookies['TokenJWT']
        const userVerified = jwt.verify(cookie, config.privateKeyJWT);
        const user = await usersService.getCurrent(userVerified);
        if(user)
            return res.send({status:"success",payload:user})
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

export {
    singUp,
    login,
    logout,
    current
}
