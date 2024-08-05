import TicketsRepository from '../repositories/tickets.repository.js';
import moment from 'moment-timezone';

const ticketsManager = new TicketsRepository();

const newDate = new Date();
const momentDate = moment(newDate);
const fechaEnBuenosAires = momentDate.tz('America/Argentina/Buenos_Aires');
fechaEnBuenosAires.format('YYYY-MM-DD HH:mm')

const getAll = async () => {
    const tickets = await ticketsManager.getAll();
    return tickets;
}
const getById = async (id) => {
    const ticket = await ticketsManager.getById(id);
    return ticket;
}
const save = async (ticket) => {
    const code = Date.now() + Math.floor(Math.random() * 100000 + 1);
    const ticketToSave = {
        code,
        type: ticket.type,
        unit_price: ticket.unit_price, 
        payMethod: ticket.payMethod,
        first_name: ticket.first_name,
        last_name: ticket.last_name,
        email: ticket.email,
        ticket_datetime:  fechaEnBuenosAires
    }
    const ticketSaved = await ticketsManager.save(ticketToSave);
    return ticketSaved;
}
const eliminate = async (id) => {
    const ticket = await ticketsManager.eliminate(id);
    return ticket;
}

export {
    getAll,
    getById,
    save,
    eliminate
}