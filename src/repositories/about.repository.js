import { About } from '../dao/factory.js';

export default class AboutRepository {
    constructor() {
        this.dao = new About();
    }
    get = async() => {
        const aboutText = await this.dao.get();
        return aboutText;
    }
    save = async(aboutText) => {
        const aboutTextSaved = await this.dao.save(aboutText);
        return aboutTextSaved;
    }
    update = async(id, aboutTextToUpdate) => {
        const aboutTextUpdated = await this.dao.update(id, aboutTextToUpdate);
        return aboutTextUpdated;
    }
}
