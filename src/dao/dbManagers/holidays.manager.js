import { holidaysModel } from "../dbManagers/models/holidays.model.js";
export default class Holidays {
    constructor() {
        console.log('Working with holidays DB');        
    }
    getAll = async() => {
        const holidays = await holidaysModel.find().lean();
        return holidays;
    }
    getById = async(id) => {
        const holidayById = await holidaysModel.findOne({ _id: id }).lean();
        return holidayById;
    }
    save = async(holiday) => {
        const holidaySaved = await holidaysModel.create(holiday);
        return holidaySaved;
    }
    update = async(id, holidayToUpdated) => {
        const holidayUpdated = await holidaysModel.findByIdAndUpdate(id, holidayToUpdated);
        return holidayUpdated;
    }
    eliminate = async(id) => {
        const holidayDeleted = await holidaysModel.findByIdAndDelete(id);
        return holidayDeleted;
    }
}