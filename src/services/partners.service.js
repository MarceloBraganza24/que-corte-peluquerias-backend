import PartnersRepository from '../repositories/partners.repository.js';
import UsersRepository from '../repositories/users.repository.js';
import TicketsRepository from '../repositories/tickets.repository.js';
import PricesRepository from '../repositories/prices.repository.js';
import { PartnerByEmailExists, PartnerExists,PartnerByEmailMembershipNumberExists } from '../utils/custom.exceptions.js';
import { htmlNewRegister } from '../utils/custom.html.js';
import { sendEmail } from './mail.service.js';
import moment from 'moment-timezone';

const partnersManager = new PartnersRepository();
const usersManager = new UsersRepository();
const ticketsManager = new TicketsRepository();
const pricesManager = new PricesRepository();

const newDate = new Date();
const momentDate = moment(newDate);
const fechaEnBuenosAires = momentDate.tz('America/Argentina/Buenos_Aires');
fechaEnBuenosAires.format('YYYY-MM-DD HH:mm')

const getAll = async () => {
    const partners = await partnersManager.getAll();
    return partners;
}
const getById = async (id) => {
    const partner = await partnersManager.getById(id);
    return partner;
}
const register = async(partner) => {
    const partners = await partnersManager.getAll();
    const partnerByEmailExists = partners.find(item => item.email == partner.email || item.partner_number == partner.partner_number);
    if(partnerByEmailExists) {
        throw new PartnerByEmailExists('There is already a partner with that data');
    }
    /* const emailNewRegister = {
        to: partner.email,
        subject: 'Registro exitoso',
        html: htmlNewRegister
    }
    await sendEmail(emailNewRegister); */
    const result = await partnersManager.save(partner);
    return result;
}

const payRegister = async(partner) => {
    const partners = await partnersManager.getAll();
    const partnerByEmailExists = partners.find(item => item.email === partner.email);
    if(partnerByEmailExists) {
        throw new PartnerByEmailExists('There is already a partner with that email');
    }
    /* const emailNewRegister = {
        to: partner.email,
        subject: 'Registro exitoso',
        html: htmlNewRegister
    }
    await sendEmail(emailNewRegister); */
    partner.partner_datetime =  fechaEnBuenosAires;
    const result = await partnersManager.save(partner);
    return result;
}

const update = async (id, partner) => {
    const partners = await partnersManager.getAll();
    const partnerById = await partnersManager.getById(id);
    const partnerByEmailExists = partners.find(item => item.email == partner.email);
    if(partnerById.first_name == partner.first_name && partnerById.last_name == partner.last_name && partnerById.partner_number == partner.partner_number && partnerById.email == partner.email) {
        throw new PartnerExists('There is already a partner with that data');
    }
    if(partnerById.first_name !== partner.first_name || partnerById.last_name !== partner.last_name || partnerById.partner_number != partner.partner_number || partnerById.email != partner.email) {
        if(partnerByEmailExists && (partnerByEmailExists._id.toString() !== partnerById._id.toString())) {
            throw new PartnerByEmailMembershipNumberExists('There is already a partner with that email or membership number');
        }
        const partnerUpdated = await partnersManager.update(id, partner);
        return partnerUpdated;
    }
}   

const eliminate = async (id) => {
    const partner = await partnersManager.eliminate(id);
    return partner;
}

export {
    getAll,
    getById,
    register,
    payRegister,
    update,
    eliminate
}