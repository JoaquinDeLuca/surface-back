import buzo from ('../models/Buzos')

const buzoController = {
    create: async (req, res) => {
        try {
            const buzo = await new buzo(req.body).save()
            res.status(201).json({
                message: 'Buzo created',
                succsess: true,
                id: buzo._id
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                message: error.message,
                success: false
            });
        }
    },

    readAll: async (req, res) => {
        let buzos
        let query = {}

        if (req.query.price) {
            query.price = req.query.price
        }

        try {
        if( !query.price ){
            buzos = await buzo.find();
            res.status(200).json({
                message: 'showing all buzos',
                response: buzos,
                success: true
            })
            return;
        }else if(query.price === 'upward'){
            buzos = await buzo.find().sort({price: 1});
            res.status(200).json({
                message: 'showing buzos by upward price',
                response: buzos,
                success: true
            })
            return;
        }else{
            buzos = await buzo.find().sort({price: -1});
            res.status(200).json({
                message: 'showing buzos by falling price',
                response: buzos,
                success: true
            })
            return;
        }
        } catch (error) {
            console.log(error);
            res.status(400).json({
                message: 'Error',
                success: false
            })
        }
    },
}

module.exports = buzoController