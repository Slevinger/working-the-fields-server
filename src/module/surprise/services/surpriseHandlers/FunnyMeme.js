const rp = require("request-promise");
let listOfMemes = [];

const GetFunnyMeme = {
  type: "funnyMeme",
  match: (input) => {
    const { name } = input;
    return !name.match(/^q/i);
  },
  getSurpriseFromInput: (input) => {
    const index = (input.name || "").split(" ").join("").length;
    const { url } = listOfMemes[index];
    return { url };
  },
};

module.exports = GetFunnyMeme;

const fillListOfMemes = async () => {
  const {
    data: { memes },
  } = await rp("https://api.imgflip.com/get_memes", {
    json: true,
  });
  listOfMemes = memes;
};
fillListOfMemes();
