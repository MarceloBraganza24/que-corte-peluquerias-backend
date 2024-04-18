import Router from "./router.js";
import { accessRolesEnum, passportStrategiesEnum } from "../config/enums.js";
import { createOrder, getWebhooks } from '../controllers/payments.controller.js';

export default class PaymentsRouter extends Router {
    init() {
        this.post('/create-preference', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, createOrder);
        this.post('/webhook', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, getWebhooks);
    }
}