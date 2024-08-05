import mongoose from 'mongoose';

const ticketsCollection = 'tickets';

const ticketsSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    },
    unit_price: {
        type: String,
        required: true
    },
    payMethod: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    ticket_datetime: {
        type: String,
        required: true
    },
});

export const ticketsModel = mongoose.model(ticketsCollection, ticketsSchema);
