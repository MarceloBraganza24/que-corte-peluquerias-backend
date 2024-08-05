import * as ticketsService from '../services/tickets.service.js';

const getAll = async (req, res) => {
    try {
        const tickets = await ticketsService.getAll();
        res.sendSuccess(tickets);
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const getById = async (req, res) => {
    try {
        const { tid } = req.params;            
        const ticket = await ticketsService.getById(tid);
        res.sendSuccess(ticket);
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const save = async (req, res) => {
    try {
        const {type,unit_price,payMethod,first_name,last_name,email} = req.body;
        if(!type || !unit_price || !payMethod || !first_name || !last_name || !email) return res.sendClientError('incomplete values');
        const ticket = await ticketsService.save({ ...req.body });
        res.sendSuccessNewResourse(ticket);
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const eliminate = async (req, res) => {
    try {
        const tid = req.params.tid;            
        const ticket = await ticketsService.eliminate(tid);
        res.sendSuccess(ticket);
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

export {
    getAll,
    getById,
    save,
    eliminate
}