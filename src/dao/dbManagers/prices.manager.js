import { pricesModel } from "../dbManagers/models/prices.model.js";
export default class Prices {
    constructor() {
        console.log('Working with prices DB');        
    }
    getAll = async() => {
        const prices = await pricesModel.find().lean();
        return prices;
    }
    getById = async(id) => {
        const priceById = await pricesModel.findOne({ _id: id }).lean();
        return priceById;
    }
    save = async(price) => {
        const priceSaved = await pricesModel.create(price);
        return priceSaved;
    }
    update = async(id, priceToUpdated) => {
        const priceUpdated = await pricesModel.findByIdAndUpdate(id, priceToUpdated);
        return priceUpdated;
    }
    eliminate = async(id) => {
        const priceDeleted = await pricesModel.findByIdAndDelete(id);
        return priceDeleted;
    }
}