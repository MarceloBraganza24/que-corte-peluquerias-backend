import Router from "./router.js";
import { accessRolesEnum, passportStrategiesEnum } from "../config/enums.js";
import { createOrderShift,getWebhooksShifts,createOrderPartner,getWebhooksPartners,createOrderMembershipFee,getWebhooksMembershipFees,createOrderMembershipFeeMobile,getWebhooksMembershipFeesMobile } from '../controllers/payments.controller.js';

export default class PaymentsRouter extends Router {
    init() {
        this.post('/create-preference-shift', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, createOrderShift);
        this.post('/webhook-shift', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, getWebhooksShifts);
        this.post('/create-preference-partner', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, createOrderPartner);
        this.post('/webhook-partner', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, getWebhooksPartners);
        this.post('/create-preference-membership-fees', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, createOrderMembershipFee);
        this.post('/webhook-membership-fees', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, getWebhooksMembershipFees);
        this.post('/create-preference-membership-fees-mobile', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, createOrderMembershipFeeMobile);
        this.post('/webhook-membership-fees-mobile', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, getWebhooksMembershipFeesMobile);
    }
}