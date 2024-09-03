import mongoose from 'mongoose';

const aboutCollection = 'about';

const aboutTextSchema = new mongoose.Schema({
    aboutText: {
        type: String,
        required: true
    }
});

export const aboutModel = mongoose.model(aboutCollection, aboutTextSchema);
