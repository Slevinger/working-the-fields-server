const rp = require("request-promise");

const GetChuckNorrisJoke = {
  type: "chuckNorris",
  match: (input) => {
    const { dateOfBirth } = input;
    return dateOfBirth.getFullYear() <= 2000;
  },
  getSurpriseFromInput: async (input) => {
    const { icon_url, value } = await rp(
      "https://api.chucknorris.io/jokes/random",
      {
        json: true,
      }
    );

    return { url: icon_url, value };
  },
};

module.exports = GetChuckNorrisJoke;
