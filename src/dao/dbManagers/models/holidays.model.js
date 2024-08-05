import mongoose from 'mongoose';

const holidaysCollection = 'holidays';

const holidaysSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    hairdresser: {
        type: String,
        required: true
    }
});

export const holidaysModel = mongoose.model(holidaysCollection, holidaysSchema);
