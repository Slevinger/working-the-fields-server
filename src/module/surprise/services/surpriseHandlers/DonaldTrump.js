const rp = require("request-promise");

const GetDonaldTrumpQuote = {
  type: "trumpQuote",
  match: (input) => {
    const { dateOfBirth, name } = input;
    return dateOfBirth.getFullYear() > 2000 && !name.match(/^[az]/i);
  },
  getSurpriseFromInput: async (input) => {
    const index = input.dateOfBirth.getDate();
    const { message } = await rp(
      "https://api.whatdoestrumpthink.com/api/v1/quotes/random",
      {
        json: true,
      }
    );
    const { url } = await rp(
      "http://www.splashbase.co/api/v1/images/" + index,
      {
        json: true,
      }
    );

    return { value: `Trump says : ${message}`, url };
  },
};

module.exports = GetDonaldTrumpQuote;
