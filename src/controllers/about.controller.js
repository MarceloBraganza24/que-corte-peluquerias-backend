import * as aboutService from '../services/about.service.js';

const get = async (req, res) => {
    try {
        const aboutText = await aboutService.get();
        res.sendSuccess(aboutText);
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const register = async (req, res) => {
    try {
        const { aboutText } = req.body;
        const obj = {
            aboutText: aboutText
        }
        const registeredAboutText = await aboutService.register(obj);
        res.sendSuccessNewResourse(registeredAboutText);
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const update = async (req, res) => {
    try {
        const atid = req.params.atid;
        const { aboutText } = req.body;
        const obj = {
            aboutText: aboutText
        }
        const aboutTextUpdated = await aboutService.update(atid, obj)
        res.sendSuccess(aboutTextUpdated);
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

export {
    get,
    register,
    update
}