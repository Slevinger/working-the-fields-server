const GetChuckNorrisJoke = require("./services/surpriseHandlers/ChuckNorris");
const GetDonaldTrumpQuote = require("./services/surpriseHandlers/DonaldTrump");
const GetFunnyMeme = require("./services/surpriseHandlers/FunnyMeme");

module.exports = [GetChuckNorrisJoke, GetDonaldTrumpQuote, GetFunnyMeme];
