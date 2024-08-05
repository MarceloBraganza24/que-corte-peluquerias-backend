import * as partnersService from '../services/partners.service.js';
import * as usersService from '../services/users.service.js';
import * as ticketsService from '../services/tickets.service.js';
import * as pricesService from '../services/prices.service.js';
import { PartnerExists, PartnerByEmailExists,PartnerByEmailMembershipNumberExists } from "../utils/custom.exceptions.js";

const getAll = async (req, res) => {
    try {
        const partners = await partnersService.getAll();
        res.sendSuccess(partners);
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const getById = async (req, res) => {
    try {
        const { pid } = req.params;            
        const partner = await partnersService.getById(pid);
        res.sendSuccess(partner);
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const register = async (req, res) => {
    try {
        const { first_name,last_name,partner_number,email,partner_datetime } = req.body;
        if(!first_name || !last_name || !email || !partner_number || !partner_datetime) return res.sendClientError('incomplete values');
        const registeredPartner = await partnersService.register({ ...req.body });
        await usersService.updateProp(email,"isMembershipFeePaid",true);
        const prices = await pricesService.getAll()
        const membershipFeePrice = prices.find(price => price.price_of == "cuota socio")
        const ticket = {
            type: membershipFeePrice.price_of,
            unit_price: membershipFeePrice.value_price_of,
            payMethod: 'Efectivo/Transferencia',
            first_name: first_name,
            last_name: last_name,
            email: email,
        }
        await ticketsService.save(ticket);
        res.sendSuccessNewResourse(registeredPartner);
    } catch (error) {
        if(error instanceof PartnerByEmailExists) {
            return res.sendClientError(error.message);
        } else {
            res.sendServerError(error.message);
            req.logger.error(error.message);
        }
    }
}

const payRegister = async (req, res) => {
    try {
        const { first_name,last_name,phone,email,value_membershipFee } = req.body;
        if(!first_name || !last_name || !email || !phone || !value_membershipFee) return res.sendClientError('incomplete values');
        const registeredPartner = await partnersService.payRegister({ ...req.body });
        res.sendSuccessNewResourse(registeredPartner);
    } catch (error) {
        if(error instanceof PartnerByEmailExists) {
            return res.sendClientError(error.message);
        }
        if (error.code === 11000) {
            res.status(409).send({ message: 'Duplicate key error', field: 'email' });
        } else {
            res.sendServerError(error.message);
            req.logger.error(error.message);
        }
    }
}

const update = async (req, res) => {
    try {
        const pid = req.params.pid;
        const partner = req.body;
        const partnerUpdated = await partnersService.update(pid, partner)
        res.sendSuccess(partnerUpdated);
    } catch (error) {
        if(error instanceof PartnerExists || error instanceof PartnerByEmailMembershipNumberExists)  {
            return res.sendClientError(error.message);
        } else {
            res.sendServerError(error.message);
            req.logger.error(error.message);
        }
    }
}

const eliminate = async (req, res) => {
    try {
        const pid = req.params.pid;        
        const {email} = req.body;    
        const partner = await partnersService.eliminate(pid);
        await usersService.updateProp(email,"isMembershipFeePaid",false);
        res.sendSuccess(partner);
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

export {
    getAll,
    getById,
    register,
    payRegister,
    update,
    eliminate
}