import ShiftsRepository from '../repositories/shifts.repository.js';
import { ShiftByDateByScheduleExists, ShiftExists } from '../utils/custom.exceptions.js';
import moment from 'moment-timezone';

const shiftsManager = new ShiftsRepository();

const newDate = new Date();
const momentDate = moment(newDate);
const fechaEnBuenosAires = momentDate.tz('America/Argentina/Buenos_Aires');
fechaEnBuenosAires.format('YYYY-MM-DD HH:mm')

const getAll = async () => {
    const shifts = await shiftsManager.getAll();
    return shifts;
}
const getById = async (id) => {
    const shift = await shiftsManager.getById(id);
    return shift;
}
const save = async (hairdresser,first_name,last_name,service,email,date,schedule,price,cancelled,shift_datetime) => {
    const shifts = await shiftsManager.getAll();
    const shiftByDateByScheduleExists = shifts.find(shift => shift.date === date && shift.schedule === schedule && shift.hairdresser === hairdresser)
    if(shiftByDateByScheduleExists) {
        throw new ShiftByDateByScheduleExists('There is already a shift with that date and time');
    }
    const shift = {
        hairdresser,
        first_name,
        last_name,
        service,
        email,
        date,
        schedule,
        price,
        cancelled,
        shift_datetime
    }
    const shiftSaved = await shiftsManager.save(shift);
    return shiftSaved;
}

const update = async (id, shift) => {
    const shifts = await shiftsManager.getAll();
    const shiftOfBD = await shiftsManager.getById(id);
    const shiftByDateByScheduleExists = shifts.find(item => item.date === shift.date && item.schedule === shift.schedule && item.hairdresser === shift.hairdresser)
    if(shiftOfBD.hairdresser === shift.hairdresser && shiftOfBD.first_name === shift.first_name && shiftOfBD.last_name === shift.last_name && shiftOfBD.service === shift.service && shiftOfBD.email === shift.email && shiftOfBD.date === shift.date && shiftOfBD.schedule === shift.schedule) {
        throw new ShiftExists('There is already a shift with that data');
    }
    if(shiftOfBD.hairdresser !== shift.hairdresser || shiftOfBD.first_name !== shift.first_name || shiftOfBD.last_name !== shift.last_name || shiftOfBD.service !== shift.service || shiftOfBD.email !== shift.email || shiftOfBD.date !== shift.date || shiftOfBD.schedule !== shift.schedule) {
        if(shiftByDateByScheduleExists && (shiftByDateByScheduleExists._id.toString() !== shiftOfBD._id.toString())) {
            throw new ShiftByDateByScheduleExists('There is already a shift with that date and time');
        }
        const shiftUpdated = await shiftsManager.update(id, shift);
        return shiftUpdated;
    }
}

const eliminate = async (id) => {
    const shift = await shiftsManager.eliminate(id);
    return shift;
}

export {
    getAll,
    getById,
    save,
    update,
    eliminate
}