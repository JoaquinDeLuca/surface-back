const Product = require("../../models/Product");
const mercadopago = require("mercadopago");
const { ACCESS_TOKEN } = process.env

mercadopago.configure({
	access_token: ACCESS_TOKEN,
});

const mercadoPagoController = {
    createml: async (req, res) => {

        let preference = {
            items: [
                {
                    title: req.body.description,
                    unit_price: Number(req.body.price),
                    quantity: Number(req.body.quantity),
                    id: "2",
                    category_id: "otris",
                    currency_id: "ARS",
                    description: "varios"
                }
            ],
            back_urls: {
                "success": "https://surface-ashen.vercel.app/",
                "failure": "http://localhost:8080/feedback",
                "pending": "http://localhost:8080/feedback"
            },
            auto_return: "approved",
        };

        mercadopago.preferences.create(preference)
            .then(function (response) {
                res.json({
                    id: response.body.id,
                    url: response.body.init_point
                });
            }).catch(function (error) {
                console.log(error);
            });   
}}

module.exports = mercadoPagoController









//MP controller
// const axios = require('axios');

// const Buzos = require("../models/Buzos");
// const Cap = require("../models/Cap");
// const Shirt = require("../models/Shirt");

// const Product = require('../models/Product')

// const paymentController = {
//     async confirmPayment(req, res) {
//         console.log('Payment confirmed', req.query);
//         const id = req.query.preference_id;
        
//         mercadopago.preferences.create(preference)
//         .then(function (response) {
// 			res.json({
// 				id: response.body.id,
//                 response: response
// 			});
// 		}).catch(function (error) {
// 			console.log(error);
// 		});

//         return res.redirect(303, `${process.env.FRONTEND_URL}/payment-success`);
//     },
//     async failedPayment(req, res) {
//         console.log('Payment failed', req.query);
//         return res.redirect(303, `${process.env.FRONTEND_URL}/payment-failure`);
//     },
//     async create(req, res) {
//         try {
//             const { mail } = req.user;
//             const { items } = req.body;
//             // sacar billing address y agregarlo en payload
//             const products = [];
//             for (const item of items) {
//                 const buzos = await Product.findById(item.id);
//                 const caps = await Product.findById(item.id);
//                 const shirt = await Product.findById(item.id);
//                 products.push({
//                     title: buzos.name,
//                     category_id: "others",
//                     quantity: item.quantity,
//                     currency_id: "ARG",
//                     unit_price: buzos.price,
//                     picture_url: buzos.photo,
//                     id: item.id
//                 });
//                 products.push({
//                   title: caps.name,
//                   category_id: "others",
//                   quantity: item.quantity,
//                   currency_id: "ARG",
//                   unit_price: caps.price,
//                   picture_url: caps.photo,
//                   id: item.id
//               });
//               products.push({
//                 title: shirt.name,
//                 category_id: "others",
//                 quantity: item.quantity,
//                 currency_id: "ARG",
//                 unit_price: shirt.price,
//                 picture_url: shirt.photo,
//                 id: item.id
//             });
//             }
//             const payload = {
//                 items: products,
//                 payer: {
//                     mail,
//                 },
//                 back_urls: {
//                     success: `${process.env.BACKEND_URL}/payments/success`,
//                     failure: `${process.env.BACKEND_URL}/payments/failure`,
//                 },
//                 auto_return: "approved",
//                 statement_descriptor: "MINDGROW",
//             };

//             const mercadopagoResponse = await axios.post('https://api.mercadopago.com/checkout/preferences', payload, {
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
//                 }
//             });

//             console.log(mercadopagoResponse);
//             return res.status(200).json({ url: mercadopagoResponse.data.init_point, success: true });
//         } catch (error) {
//             console.log(error)
//             return res.status(500).json({
//                 error: true,
//                 message: 'Failed to create payment'
//             })
//         }
//     },
// };

// module.exports = paymentController
