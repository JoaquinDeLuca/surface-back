const Buzo = require('../models/Buzos')

const buzoController = {
    create: async (req, res) => {
        try {
            const buzo = await new Buzo(req.body).save()
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
            if (!query.price) {
                buzos = await Buzo.find();
                res.status(200).json({
                    message: 'showing all buzos',
                    response: buzos,
                    success: true
                })
                return;
            } else if (query.price === 'upward') {
                buzos = await Buzo.find().sort({ price: 1 });
                res.status(200).json({
                    message: 'showing buzos by upward price',
                    response: buzos,
                    success: true
                })
                return;
            } else {
                buzos = await Buzo.find().sort({ price: -1 });
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
    update: async (req, res) => {
        const { id } = req.params;
      
        try{
          let buzoUpdate = await buzo.findByIdAndUpdate(
            {_id: id},
            req.body
          );
          if (buzoUpdate) {
            res.status(200).json({
              message: "you have update a buzo",
              success: true,
            });
          }else{
            res.status(404).json({
              message: "the buzo to update was not found",
              success: false,
            });
          }
        } catch (error) {
          console.log(error);
          res.status(400).json({
            message: "error",
            success: false,
          })
        }
      },
      delete: async (req, res) => {
        const { id } = req.params;
        try {
          let buzoDelete = await buzo.findByIdAndDelete({_id: id });
          if (buzoDelete){
            res.status(200).json({
              message: "You have delete a buzo",
              success: true,
            });
          }else {
            res.status(404).json({
              message: "The buzo to delete was not found",
              success: false,
            });
          }
        }catch (error) {
          console.log(error);
          res.status(400).json({
            message: "error",
            success: false,
          })
        }
      }
}

module.exports = buzoController