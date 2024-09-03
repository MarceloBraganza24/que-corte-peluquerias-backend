import aboutRepository from '../repositories/about.repository.js';

const aboutManager = new aboutRepository();

const get = async () => {
    const aboutText = await aboutManager.get();
    return aboutText;
}
const register = async(aboutText) => {
    const result = await aboutManager.save(aboutText);
    return result;
}
const update = async (id, aboutText) => {
    const aboutTextUpdated = await aboutManager.update(id, aboutText);
    return aboutTextUpdated;
}

export {
    get,
    register,
    update
}