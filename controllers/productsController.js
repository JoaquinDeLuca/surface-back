const Buzos = require("../models/Buzos");
const Cap = require("../models/Cap");
const Shirt = require("../models/Shirt");

const productsController = {
  getAll: async (req, res) => {
    try {
      let products = [];
      const buzos = await Buzos.find();
      const caps = await Cap.find();
      const shirts = await Shirt.find();

      products = [...buzos, ...caps, ...shirts];

      res.status(201).json({
        message:
          products.length > 0
            ? "You get all products"
            : "You have no products yet",
        success: true,
        products: products,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "Internal server error",
        success: false,
      });
    }
  },
  getByIdAndType: async (req, res) => {
    const { type, id } = req.params;

    try {
      let product = null;
      if (type === "buzo") {
        const buzo = await Buzos.findOne({ _id: id });
        product = buzo;
      } else if (type === "cap") {
        const cap = await Cap.findOne({ _id: id });
        product = cap;
      } else if (type === "shirt") {
        const shirt = await Shirt.findOne({ _id: id });
        product = shirt;
      }

      if (product) {
        return res.status(200).json({
          message: "You get the product",
          response: product,
          success: true,
        });
      }

      res.status(200).json({
        message: "The product does not exist",
        success: true,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "Internal server error",
        success: false,
      });
    }
  },
};
module.exports = productsController;
