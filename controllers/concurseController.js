const Concurse = require("../models/Concurse");

const concurseController = {
  create: async (req, res) => {
    const buyer = req.body.buyer;
    //Esto debe venir del usuario authenticado que nos inyecta Passport en el request.
    if (!buyer) {
      return res.status(400).json({
        message: "User is not a buyer",
        success: false,
      });
    }

    try {
      const concurse = await new Concurse(req.body).save();
      res.status(201).json({
        message: "Concurse created",
        success: true,
        id: concurse._id,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: error.message,
        success: false,
      });
    }
  },
  getAll: async (req, res) => {
    // tengo(uno o muchos) o no tengo([])
    try {
      const concurses = await Concurse.find();

      res.status(201).json({
        message:
          concurses.length > 0
            ? "You get all concurses"
            : "You have no concurses yet",
        success: true,
        concurses: concurses,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "Internal error",
        success: false,
      });
    }
  },
  readID: async (req, res) => {
    const { id } = req.params;
    try {
      let concurse = await Concurse.findOne({ _id: id });

      if (concurse) {
        res.status(200).json({
          message: "You get one concurse",
          response: concurse,
          success: true,
        });
      } else {
        res.status(404).json({
          message: "Couldn't find concurse",
          success: false,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "Syntax error or others",
        success: false,
      });
    }
  },
  //Incluir si quien lo creo es User o Admin (passport):
  update: async (req, res) => {
    const { id } = req.params;

    try {
      let concurseUpdate = await Concurse.findByIdAndUpdate(
        { _id: id },
        req.body
      );
      if (concurseUpdate) {
        res.status(200).json({
          message: "you have update a concurse",
          success: true,
        });
      } else {
        res.status(404).json({
          message: "the concurse to update was not found",
          success: false,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "error",
        success: false,
      });
    }
  },
  //Incluir si quien lo creo es User o Admin (passport):
  deleteConcurse: async (req, res) => {
    const { id } = req.params;
    try {
      let concurseDelete = await Concurse.findByIdAndDelete({ _id: id });
      if (concurseDelete) {
        res.status(200).json({
          message: "You have delete a concurse",
          success: true,
        });
      } else {
        res.status(404).json({
          message: "The concurse to delete was not found",
          success: false,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "error",
        success: false,
      });
    }
  },
};

module.exports = concurseController;
