const Concurse = require("../models/Concurse");
const User = require("../models/User")

const concurseController = {
  create: async (req, res) => {
    const {name} = req.body;

    const user = await User.findOne({_id : name})
    const concurse = await Concurse.find({name : name})
    //Esto debe venir del usuario authenticado que nos inyecta Passport en el request.
    if (!user.buyer) {
      return res.status(400).json({
        message: "User is not a buyer",
        success: false,
      });
    } else if(concurse){
      return res.status(400).json({
        message: "This user has a post created",
        success: false,
      });
    }
    else {
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
    }
  },
  likeDislikePost: async (req, res) => {
    let { postId, userId } = req.body;
    
    let posts = await Concurse.findOne({ _id: postId });

    try {

      if (posts && posts.likes.includes(userId)) {
        posts.likes.pull(userId);
        await posts.save();
        res.status(200).json({
          message: "Like removed",
          success: true,
        });
      } else if (!posts.likes.includes(userId)) {
        posts.likes.push(userId);
        await posts.save();
        res.status(200).json({
          message: "Post liked",
          success: true,
        });
      } else {
        res.status(404).json({
          message: "Itinerary not found",
          success: true,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "error cant be like/dislike",
        success: false,
      });
    }
  },
  getAll: async (req, res) => {
    // tengo(uno o muchos) o no tengo([])
    try {
      const concurses = await Concurse.find().populate('name',{name: 1, email: 1, photo: 1});

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
  getTopThree: async (req, res) => {
    try{
      let concurses = await Concurse.find().populate('name',{name: 1, email: 1, photo: 1}).sort({likes: -1})
      if (concurses){
        res.status(200).json({
          message: "you get top three posts",
          response: concurses.slice(0,3),
          success: true,
        })
      }else {
        res.status(404).json({
          message: "Courses dont found",
          success: false,
        });
      }
    }catch(err){
      console.log(err);
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
