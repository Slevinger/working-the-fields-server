const _calculateAge = require("./statistics");
const statistics = require("./statistics");
const handlers = require("../surprise.services");

const getSurpriseFromContext = async (input) => {
  const surprises = handlers.filter(({ match }) => match(input));
  const randomIndex = Math.floor(Math.random() * surprises.length);
  const surprise = surprises[randomIndex];
  const { type } = surprise;
  // log statitics
  statistics.log(input, type);
  const result = await surprise.getSurpriseFromInput(input);
  return { ...result, type };
};

module.exports = getSurpriseFromContext;
