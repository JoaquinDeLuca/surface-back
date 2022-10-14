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
    const { id } = req.params;

    let products = [];
    const buzos = await Buzos.findOne({_id : id});
    const caps = await Cap.findOne({_id : id});
    const shirts = await Shirt.findOne({_id : id});

    if(buzos != null){
      products = buzos
    }
    if(caps != null){
      products = caps
    }
    if(shirts != null){
      products = shirts
    }

    try {
      
      if (products) {
        return res.status(200).json({
          message: "You get the products",
          response: products,
          success: true,
        });
      }

      res.status(200).json({
        message: "The products does not exist",
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
  editProduct: async (req, res) => {
    const { id } = req.body;

    let products = [];
    const buzos = await Buzos.findByIdAndUpdate({_id : id}, req.body);
    const caps = await Cap.findByIdAndUpdate({_id : id}, req.body);
    const shirts = await Shirt.findByIdAndUpdate({_id : id}, req.body);

    if(buzos != null){
      products = buzos
    }
    if(caps != null){
      products = caps
    }
    if(shirts != null){
      products = shirts
    }

    try{
      if (products) {
        res.status(200).json({
          message: "you have update a clothe",
          success: true,
        });
      } else {
        res.status(404).json({
          message: "The clothe to update was not found",
          success: false,
        });
      }
    } catch (error){
      console.log(error)
      res.status(400).json({
        message: "error",
        success: false,
      });
    }
  },
  deleteProduct: async (req, res) => {
    const { id } = req.body;

    let products = [];
    const buzos = await Buzos.findByIdAndDelete({_id : id});
    const caps = await Cap.findByIdAndDelete({_id : id});
    const shirts = await Shirt.findByIdAndDelete({_id : id});

    if(buzos != undefined){
      products = buzos
    }
    if(caps != undefined){
      products = caps
    }
    if(shirts != undefined){
      products = shirts
    }

    try{
      if (products) {
        res.status(200).json({
          message: "you have delete a product",
          success: true,
        });
      } else {
        res.status(404).json({
          message: "The product to delete was not found",
          success: false,
        });
      }
    } catch (error){
      console.log(error)
      res.status(400).json({
        message: "error",
        success: false,
      });
    }
  },
};
module.exports = productsController;
