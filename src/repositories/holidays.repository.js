import { Holidays } from '../dao/factory.js';

export default class HolidaysRepository {
    constructor() {
        this.dao = new Holidays();
    }
    getAll = async() => {
        const holidays = await this.dao.getAll();
        return holidays;
    }
    getById = async(pid) => {
        const holidayById = await this.dao.getById(pid);
        return holidayById;
    }
    save = async(holiday) => {
        const holidaySaved = await this.dao.save(holiday);
        return holidaySaved;
    }
    eliminate = async(id) => {
        const holidayDeleted = await this.dao.eliminate(id);
        return holidayDeleted;
    }
}

