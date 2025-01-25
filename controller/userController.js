const User = require("../models/userModel");
const PointHistory = require("../models/pointsModel");
const {  mongoose } = require("mongoose");



exports.addingUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      status: false,
      message: "error",
      error: "Name required",
    });
  }

  try {
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "error",
        error: "User already exist",
      });
    }

    const newUser = new User({ name });
    await newUser.save();

    res.status(201).json({
      status: true,
      message: "user created successfully",
      error: null,
      data: newUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      message: "error",
      error: "error occurred while creating  user",
    });
  }
};
exports.claimPoints = async (req, res) => {
    const { userId } = req.body;
  
    if (!userId) {
      return res.status(400).json({
        status: false,
        message: "error",
        error: "All fields are required",
      });
    }
  
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        status: false,
        message: "error",
        error: "invalid UserID format",
      });
    }
  
    const points = Math.floor(Math.random() * 10) + 1;
  
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { $inc: { totalPoints: points } },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({
          status: false,
          message: "error",
          error: "user not found",
        });
      }
  
      const history = new PointHistory({ userId, points });
      await history.save();
  
      res.status(200).json({
        status: true,
        message: "points updated successfully",
        error: null,
        data: { user, history },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        status: false,
        message: "error",
        error: "error occurr while claiming points",
      });
    }
  };
exports.getLeaderBoard=async(req,res)=>{
    try{  

        

        const leaderboard = await User.find().sort({ totalPoints: -1 });

        if(leaderboard.length==0){
            return res.status(404).json({
                status: false,
                message: "error",
                error: "No user found",
              });
        }

        res.status(200).json({
            status: true,
            message: "leaderboard fetch successfully",
            error: null,
            data: leaderboard,
          });

    }catch(err){
        console.error(err);
        res.status(500).json({
          status: false,
          message: "error",
          error: "error occurr while fetching  leaderboard",
        });
    }
}