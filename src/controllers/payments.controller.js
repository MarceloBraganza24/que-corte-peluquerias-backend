import * as shiftsService from '../services/shifts.service.js';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({ accessToken: 'TEST-8730839288140102-041711-ed2d247d680a854304b88828a652cf6d-1771017789' });
const createOrder = async (req, res) => {
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
                success: "https://g9s2wrzd-5173.brs.devtunnels.ms/shifts",
                failure: "https://g9s2wrzd-5173.brs.devtunnels.ms/shifts",
                pending: "https://g9s2wrzd-5173.brs.devtunnels.ms/shifts"
            },
            auto_return: "approved",
            notification_url: `https://g9s2wrzd-8081.brs.devtunnels.ms/api/payments/webhook?first_name=${req.body.first_name}&last_name=${req.body.last_name}&date=${req.body.date}&schedule=${req.body.schedule}`
            
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

const getWebhooks = async (req, res) => {
    const payment = req.query;
    const d = new Date(payment.date)
    const dateString = d.toISOString().split('T')[0]
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
            await shiftsService.save(payment.first_name, payment.last_name, dateString, payment.schedule);
            res.sendStatus(200);
        }
    }
}

export {
    createOrder,
    getWebhooks
}