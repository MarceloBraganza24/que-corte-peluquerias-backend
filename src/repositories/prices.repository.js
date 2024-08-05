import { Prices } from '../dao/factory.js';

export default class PricesRepository {
    constructor() {
        this.dao = new Prices();
    }
    getAll = async() => {
        const prices = await this.dao.getAll();
        return prices;
    }
    getById = async(pid) => {
        const priceById = await this.dao.getById(pid);
        return priceById;
    }
    save = async(price) => {
        const priceSaved = await this.dao.save(price);
        return priceSaved;
    }
    update = async(id, priceToUpdate) => {
        const priceUpdated = await this.dao.update(id, priceToUpdate);
        return priceUpdated;
    }
    eliminate = async(id) => {
        const priceDeleted = await this.dao.eliminate(id);
        return priceDeleted;
    }
}