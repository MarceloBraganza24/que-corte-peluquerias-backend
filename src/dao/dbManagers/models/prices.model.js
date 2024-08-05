import mongoose from 'mongoose';

const pricesCollection = 'prices';

const pricesSchema = new mongoose.Schema({
    price_of: {
        type: String,
        required: true
    },
    value_price_of: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price_datetime: {
        type: String,
        required: true
    }
});

export const pricesModel = mongoose.model(pricesCollection, pricesSchema);
