import { aboutModel } from "../dbManagers/models/about.model.js";
export default class About {
    constructor() {
        console.log('Working with about DB');        
    }
    get = async() => {
        const aboutText = await aboutModel.find().lean();
        return aboutText;
    }
    save = async(aboutText) => {
        const aboutTextSaved = await aboutModel.create(aboutText);
        return aboutTextSaved;
    }
    update = async(id, aboutTextToUpdated) => {
        const aboutTextUpdated = await aboutModel.findByIdAndUpdate(id, aboutTextToUpdated);
        return aboutTextUpdated;
    }
}