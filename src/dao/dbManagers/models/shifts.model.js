import mongoose from 'mongoose';

const shiftsCollection = 'shifts';

const shiftsSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true
    },
    service: {
        type: String,
    },
    email: {
        type: String,
    },
    date: {
        type: String,
        required: true
    },
    schedule: {
        type: String,
        required: true
    },
    price: {
        type: String
    },
    shift_datetime: {
        type: String,
        required: true
    },
    hairdresser: {
        type: String,
        required: true
    },
    cancelled: {
        type: Boolean,
        default: false
    }
});

export const shiftsModel = mongoose.model(shiftsCollection, shiftsSchema);
