import * as holidaysService from '../services/holidays.service.js';
import { HolidayExists } from "../utils/custom.exceptions.js";

const getAll = async (req, res) => {
    try {
        const holidays = await holidaysService.getAll();
        res.sendSuccess(holidays);
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const getById = async (req, res) => {
    try {
        const { hid } = req.params;            
        const holiday = await holidaysService.getById(hid);
        res.sendSuccess(holiday);
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const register = async (req, res) => {
    try {
        const { date,hairdresser } = req.body;
        const registeredHoliday = await holidaysService.register(date,hairdresser);
        res.sendSuccessNewResourse(registeredHoliday);
    } catch (error) {
        if(error instanceof HolidayExists) {
            return res.sendClientError(error.message);
        } else {
            res.sendServerError(error.message);
            req.logger.error(error.message);
        }
    }
}

const eliminate = async (req, res) => {
    try {
        const hid = req.params.hid;        
        const holiday = await holidaysService.eliminate(hid);
        res.sendSuccess(holiday);
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

export {
    getAll,
    getById,
    register,
    eliminate
}