const PointHistory = require("../models/pointsModel");


exports.getHistory = async (req, res) => {
    
    
    const { userId } = req.query;
  console.log(userId);
  try {
    const history = await PointHistory.find({ userId }).sort({ claimedAt: -1 });
    res.status(200).json({ success: true, history });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Failed to fetch history", error: err.message });
  }
};
