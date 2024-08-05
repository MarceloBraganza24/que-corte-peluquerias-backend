import PricesRepository from '../repositories/prices.repository.js';
import { PriceAlreadyExists, PriceByPriceOfExists } from '../utils/custom.exceptions.js';
import moment from 'moment-timezone';

const pricesManager = new PricesRepository();

const newDate = new Date();
const momentDate = moment(newDate);
const fechaEnBuenosAires = momentDate.tz('America/Argentina/Buenos_Aires');
fechaEnBuenosAires.format('YYYY-MM-DD HH:mm')

const getAll = async () => {
    const prices = await pricesManager.getAll();
    return prices;
}
const getById = async (id) => {
    const price = await pricesManager.getById(id);
    return price;
}
const register = async(price) => {
    const prices = await pricesManager.getAll();
    const priceByPriceOfCategoryExists = prices.find(item => item.price_of == price.price_of && item.category == price.category)
    //const priceByCategoryExists = prices.find(item => item.category === price.category)
    if(priceByPriceOfCategoryExists) {
        throw new PriceByPriceOfExists('There is already a price with that price of');
    }
    price.price_datetime =  fechaEnBuenosAires;
    const result = await pricesManager.save(price);
    return result;
}

const update = async (id, price) => {
    const prices = await pricesManager.getAll();
    const priceById = await pricesManager.getById(id);
    const priceByPriceOfExists = prices.find(item => item.price_of === price.price_of && item.category == price.category)
    if(priceById.price_of === price.price_of && priceById.value_price_of == price.value_price_of && priceById.category == price.category) {
        throw new PriceAlreadyExists('There is already a price with that data');
    }
    if(priceById.price_of !== price.price_of || priceById.value_price_of != price.value_price_of || priceById.category !== price.category) {
        if(priceByPriceOfExists && (priceByPriceOfExists._id.toString() !== priceById._id.toString())) {
            throw new PriceByPriceOfExists('There is already a price with that price of');
        }
        const priceUpdated = await pricesManager.update(id, price);
        return priceUpdated;
    }
}

const eliminate = async (id) => {
    const price = await pricesManager.eliminate(id);
    return price;
}

export {
    getAll,
    getById,
    register,
    update,
    eliminate
}