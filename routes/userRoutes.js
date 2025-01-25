const express = require("express");
const { addingUser, claimPoints, getLeaderBoard } = require("../controller/userController");
const router = express.Router();


router.post("/users", addingUser);


router.post("/claim-points", claimPoints);


router.get("/leaderboard", getLeaderBoard);

module.exports = router;
