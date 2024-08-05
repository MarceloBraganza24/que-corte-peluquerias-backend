import HolidaysRepository from '../repositories/holidays.repository.js';
import {  HolidayExists } from '../utils/custom.exceptions.js';

const holidaysManager = new HolidaysRepository();

const getAll = async () => {
    const holidays = await holidaysManager.getAll();
    return holidays;
}
const getById = async (id) => {
    const holiday = await holidaysManager.getById(id);
    return holiday;
}
const register = async(date,hairdresser) => {
    const holiday = {
        hairdresser,
        date
    }
    const holidays = await holidaysManager.getAll();
    const holidayExists = holidays.find(item => item.date == date && item.hairdresser == hairdresser);
    if(holidayExists) {
        throw new HolidayExists('There is already a holiday with that date and hairdresser');
    }
    const result = await holidaysManager.save(holiday);
    return result;
}

const eliminate = async (id) => {
    const holiday = await holidaysManager.eliminate(id);
    return holiday;
}

export {
    getAll,
    getById,
    register,
    eliminate
}