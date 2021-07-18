require("./surprise.services");
const handleSurprise = require("./services/SurpriseHandler");
const statistics = require("./services/statistics");

module.exports = {
  getSurprise: async (req, res, next) => {
    try {
      // const result = await surpriseService.findVasts();
      const surprise = await handleSurprise(req.ctx);
      return res.status(200).send(surprise);
    } catch (err) {
      next(err);
    }
  },
  getStatistics: (req, res, next) => {
    const { averageAge, distribution, countryDistribution } = statistics;
    return res
      .status(200)
      .send({ averageAge, distribution, countryDistribution });
  },
};
