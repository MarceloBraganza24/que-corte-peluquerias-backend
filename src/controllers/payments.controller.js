import * as shiftsService from '../services/shifts.service.js';
import * as ticketsService from '../services/tickets.service.js';
import * as partnersService from '../services/partners.service.js';
import * as usersService from '../services/users.service.js';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({ accessToken: 'APP_USR-8730839288140102-041711-5191da1d09ff6dadb6da4e113c6fd8bc-1771017789' });

const createOrderShift = async (req, res) => {
    try {
        const body = {
            items: [
                {
                    title: req.body.title,
                    quantity: Number(req.body.quantity),
                    unit_price: Number(req.body.unit_price),
                    currency_id: "ARS"
                }
            ],
            back_urls: {
                success: "https://que-corte-peluquerias-frontend-mkxktyjzsa-rj.a.run.app/shifts",
                failure: "https://que-corte-peluquerias-frontend-mkxktyjzsa-rj.a.run.app/shifts",
                pending: "https://que-corte-peluquerias-frontend-mkxktyjzsa-rj.a.run.app/shifts"
            },
            auto_return: "approved",
            notification_url: `https://que-corte-peluquerias-backend-mkxktyjzsa-rj.a.run.app/api/payments/webhook-shift?title=${req.body.title}&unit_price=${req.body.unit_price}&first_name=${req.body.first_name}&last_name=${req.body.last_name}&email=${req.body.email}&date=${req.body.date}&schedule=${req.body.schedule}`
        }
        const preference = new Preference(client)
        const result = await preference.create({body});
        res.json({
            id: result.id
        });
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}
const getWebhooksShifts = async (req, res) => {
    const payment = req.query;
    const paymentId = payment['data.id'];
    if(payment.type === 'payment') {
        const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${client.accessToken}`
            }
        })
        const data = await response.json();
        if(data.status === 'approved' && data.status_detail === 'accredited') {
            await shiftsService.save(payment.first_name, payment.last_name, payment.email, payment.date, payment.schedule);
            const ticket = {
                type: payment.title,
                unit_price: payment.unit_price,
                payMethod: 'Mercado pago',
                first_name: payment.first_name,
                last_name: payment.last_name,
                email: payment.email,
            }
            await ticketsService.save(ticket);
            res.sendStatus(200);
        }
    }
}

const createOrderPartner = async (req, res) => {
    try {
        const body = {
            items: [
                {
                    title: req.body.title,
                    quantity: Number(req.body.quantity),
                    unit_price: Number(req.body.unit_price),
                    currency_id: "ARS"
                }
            ],
            back_urls: {
                success: "https://que-corte-peluquerias-frontend-mkxktyjzsa-rj.a.run.app/partners",
                failure: "https://que-corte-peluquerias-frontend-mkxktyjzsa-rj.a.run.app/partners",
                pending: "https://que-corte-peluquerias-frontend-mkxktyjzsa-rj.a.run.app/partners"
            },
            auto_return: "approved",
            notification_url: `https://que-corte-peluquerias-backend-mkxktyjzsa-rj.a.run.app/api/payments/webhook-partner?title=${req.body.title}&unit_price=${req.body.unit_price}&first_name=${req.body.first_name}&last_name=${req.body.last_name}&dni=${req.body.dni}&phone=${req.body.phone}&email=${req.body.email}`
        }
        const preference = new Preference(client)
        const result = await preference.create({body});
        res.json({
            id: result.id
        });
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}
const getWebhooksPartners = async (req, res) => {
    const payment = req.query;
    const paymentId = payment['data.id'];
    if(payment.type === 'payment') {
        const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${client.accessToken}`
            }
        })
        const data = await response.json();
        if(data.status === 'approved' && data.status_detail === 'accredited') {
            const partner = {
                first_name: payment.first_name,
                last_name: payment.last_name,
                dni: payment.dni,
                phone: payment.phone,
                email: payment.email,
            }
            await partnersService.payRegister(partner);
            const currentUser = await usersService.getByEmail(payment.email);
            currentUser.role = 'partner';
            await usersService.update(currentUser._id,currentUser);
            const ticket = {
                type: payment.title,
                unit_price: payment.unit_price,
                payMethod: 'Mercado pago',
                first_name: payment.first_name,
                last_name: payment.last_name,
                email: payment.email,
            }
            await ticketsService.save(ticket);
            res.sendStatus(200);
        }
    }
}

const createOrderMembershipFee = async (req, res) => {
    try {
        const body = {
            items: [
                {
                    title: req.body.title,
                    quantity: Number(req.body.quantity),
                    unit_price: Number(req.body.unit_price),
                    currency_id: "ARS"
                }
            ],
            back_urls: {
                success: "https://que-corte-peluquerias-frontend-mkxktyjzsa-rj.a.run.app/partners",
                failure: "https://que-corte-peluquerias-frontend-mkxktyjzsa-rj.a.run.app/partners",
                pending: "https://que-corte-peluquerias-frontend-mkxktyjzsa-rj.a.run.app/partners"
            },
            auto_return: "approved",
            notification_url: `https://que-corte-peluquerias-backend-mkxktyjzsa-rj.a.run.app/api/payments/webhook-membership-fees?title=${req.body.title}&unit_price=${req.body.unit_price}&first_name=${req.body.first_name}&last_name=${req.body.last_name}&email=${req.body.email}`
        }
        const preference = new Preference(client)
        const result = await preference.create({body});
        res.json({
            id: result.id
        });
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}
const getWebhooksMembershipFees = async (req, res) => {
    const payment = req.query;
    const paymentId = payment['data.id'];
    if(payment.type === 'payment') {
        const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${client.accessToken}`
            }
        })
        const data = await response.json();
        if(data.status === 'approved' && data.status_detail === 'accredited') {
            const ticket = {
                type: payment.title,
                unit_price: payment.unit_price,
                payMethod: 'Mercado pago',
                first_name: payment.first_name,
                last_name: payment.last_name,
                email: payment.email,
            }
            await ticketsService.save(ticket);
            res.sendStatus(200);
        }
    }
}

const createOrderMembershipFeeMobile = async (req, res) => {
    try {
        const body = {
            items: [
                {
                    title: req.body.title,
                    quantity: Number(req.body.quantity),
                    unit_price: Number(req.body.unit_price),
                    currency_id: "ARS"
                }
            ],
            back_urls: {
                success: "https://que-corte-peluquerias-frontend-mkxktyjzsa-rj.a.run.app/partners",
                failure: "https://que-corte-peluquerias-frontend-mkxktyjzsa-rj.a.run.app/partners",
                pending: "https://que-corte-peluquerias-frontend-mkxktyjzsa-rj.a.run.app/partners"
            },
            auto_return: "approved",
            notification_url: `https://que-corte-peluquerias-backend-mkxktyjzsa-rj.a.run.app/api/payments/webhook-membership-fees-mobile?title=${req.body.title}&unit_price=${req.body.unit_price}&first_name=${req.body.first_name}&last_name=${req.body.last_name}&email=${req.body.email}`
        }
        const preference = new Preference(client)
        const result = await preference.create({body});
        res.json({
            id: result.id
        });
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}
const getWebhooksMembershipFeesMobile = async (req, res) => {
    const payment = req.query;
    const paymentId = payment['data.id'];
    if(payment.type === 'payment') {
        const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${client.accessToken}`
            }
        })
        const data = await response.json();
        if(data.status === 'approved' && data.status_detail === 'accredited') {
            const ticket = {
                type: payment.title,
                unit_price: payment.unit_price,
                payMethod: 'Mercado pago',
                first_name: payment.first_name,
                last_name: payment.last_name,
                email: payment.email,
            }
            await ticketsService.save(ticket);
            res.sendStatus(200);
        }
    }
}

export {
    createOrderShift,
    getWebhooksShifts,
    createOrderPartner,
    getWebhooksPartners,
    createOrderMembershipFee,
    getWebhooksMembershipFees,
    createOrderMembershipFeeMobile,
    getWebhooksMembershipFeesMobile
}