const Cap = require('../models/Cap')


const capControllers = {
    create: async (req, res) => {
        try {
            const cap = await new Cap(req.body).save()
            res.status(201).json({
                message: "New cap created",
                id: cap._id,
                success: true,
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: "Couldn't create cap",
                success: false,
            })
        }
    },
    readID: async (req, res) => {
        const { id } = req.params
        try {
            let cap = await Cap.findOne({ _id: id })

            if (cap) {
                res.status(200).json({
                    message: "You get one cap",
                    response: cap,
                    success: true,
                })
            } else {
                res.status(404).json({
                    message: "Couldn't find cap",
                    success: false,
                })
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: "Syntax error or others",
                success: false,
            })

        }
    },

    readQuery: async (req, res) => {
        let cap
        let query = {}

        if (req.query.price) {
            query.price = req.query.price
        }

        try {
            if (!query.price) {
                cap = await Cap.find();
                res.status(200).json({
                    message: "Showinf all cap",
                    response: cap,
                    success: true,
                })
                return;
            } else if (query.price === 'upward') {
                cap = await Cap.find().sort({ price: 1 });
                res.status(200).json({
                    message: "Showing cap by upward price",
                    response: cap,
                    success: true,
                })
                return;
            } else {
                cap = await Cap.find().sort({ price: -1 });
                res.status(200).json({
                    message: "Showing cap by falling price",
                    response: cap,
                    success: true,
                })
            }
            return;
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: "Syntax error or others",
                success: false,
            })
        }
    }
}

module.exports = capControllers