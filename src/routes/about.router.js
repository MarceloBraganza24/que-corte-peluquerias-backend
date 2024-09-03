import Router from "./router.js";
import { accessRolesEnum, passportStrategiesEnum } from "../config/enums.js";
import { get,register,update } from '../controllers/about.controller.js';

export default class AboutRouter extends Router {
    init() {
        this.get('/', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, get);
        this.post('/register', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, register);
        this.put('/:atid', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, update);
    }
}