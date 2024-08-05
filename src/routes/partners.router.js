import Router from "./router.js";
import { accessRolesEnum, passportStrategiesEnum } from "../config/enums.js";
import { getAll, getById, register, payRegister, update, eliminate } from '../controllers/partners.controller.js';

export default class PartnersRouter extends Router {
    init() {
        this.get('/', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, getAll);
        this.get('/:pid', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, getById);
        this.post('/register', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, register);
        this.post('/pay-register', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, payRegister);
        this.put('/:pid', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, update);
        this.delete('/:pid', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, eliminate);
    }
}