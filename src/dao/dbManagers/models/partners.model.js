import mongoose from 'mongoose';

const partnersCollection = 'partners';

const partnersSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    partner_number: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    documents: {
        type: [
            {
                name: {
                    type: String
                },
                reference: {
                    type: String
                }
            }
        ],
        default: []
    },
    partner_datetime: {
        type: String,
        required: true
    }
});

export const partnersModel = mongoose.model(partnersCollection, partnersSchema);
