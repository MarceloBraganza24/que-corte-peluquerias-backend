import ShiftsRepository from '../repositories/shifts.repository.js';
import { ShiftByDateByScheduleExists, ShiftExists } from '../utils/custom.exceptions.js';
//import iconv from 'iconv-lite';

const shiftsManager = new ShiftsRepository();



function processObjectProperties(obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            // Reemplazar propiedades undefined con una cadena vacía o un valor por defecto
            if (obj[key] === undefined) {
                obj[key] = ''; // O cualquier valor por defecto que desees
            } else if (typeof obj[key] === 'string') {
                // Validar y corregir cadenas, si es necesario
                if (!isValidUTF8(obj[key])) {
                    console.warn(`La propiedad ${key} contiene datos no válidos en UTF-8. Corrigiendo...`);
                    // Aquí puedes reemplazar o corregir los caracteres no válidos según sea necesario
                    obj[key] = sanitizeString(obj[key]);
                }
            }
        }
    }
}

// Función para validar si una cadena es válida en UTF-8
function isValidUTF8(str) {
    try {
        // Convertir la cadena a una nueva cadena en UTF-8
        decodeURIComponent(escape(str));
        return true;
    } catch (e) {
        return false;
    }
}

// Función para sanitizar cadenas que pueden tener datos no válidos en UTF-8
function sanitizeString(str) {
    // Reemplazar caracteres no válidos con un espacio o eliminar caracteres problemáticos
    return str.replace(/[^\x00-\x7F]/g, ''); // Elimina caracteres no ASCII (opcional)
}






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
        price: price?price:'',
        cancelled: cancelled?cancelled:false,
        shift_datetime
    }
    //const validateUtf8Shift = processObjectProperties(shift);
    //console.log(shift)
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