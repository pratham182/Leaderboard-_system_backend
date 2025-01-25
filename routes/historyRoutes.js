const express = require("express");
const { getHistory } = require("../controller/historyController");
const router = express.Router();



router.get("/point-history", getHistory);

module.exports = router;


