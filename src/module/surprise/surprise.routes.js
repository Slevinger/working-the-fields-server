const express = require("express");
const queryContextExtractor = require("./middleware/queryContextExtractor");
const surpriseController = require("./surprise.controller");
const surpriseRouter = express.Router();

surpriseRouter.get(
  "/name/:name/country/:country/dob/:dob",
  queryContextExtractor,
  surpriseController.getSurprise
);

surpriseRouter.get("/statistics", surpriseController.getStatistics);

module.exports = surpriseRouter;
