const Shirt = require('../models/Shirt')


const shirtController = {

  create: async (req, res) => {
    try {
      const shirt = await new Shirt(req.body).save() //req.body tiene que tener todas las variables antes descritas
      res.status(201).json({ message: 'Shirt created', succsess: true, id: shirt._id });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message, success: false });
    }
  },

  readAll: async (req, res) => {
    let shirts
    let query = {}

    if (req.query.price) {
      query.price = req.query.price
    }

    try {

      if (!query.price) {
        shirts = await Shirt.find();
        res.status(200).json({ message: 'showing all t-shirts', response: shirts, success: true })
        return;
      } else if (query.price === 'upward') {
        shirts = await Shirt.find().sort({ price: 1 });
        res.status(200).json({ message: 'showing t-shirts by upward price', response: shirts, success: true })
        return;
      } else {
        shirts = await Shirt.find().sort({ price: -1 });
        res.status(200).json({ message: 'showing t-shirts by falling price', response: shirts, success: true })
        return;
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Error', success: false })
    }
  },

}

module.exports = shirtController