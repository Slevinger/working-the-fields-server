const fs = require("fs");
const dbjson = require("../../../db.json");
const log = dbjson.map(({ dateOfBirth, ...rest }) => ({
  dateOfBirth: new Date(dateOfBirth),
  ...rest,
}));

// fs.readFileSync(__dirname+"/..")

const _calculateAge = (birthday) => {
  // birthday is a date
  const ageDifMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const distributionBy = (key) => {
  return log.reduce(
    (acc, item) => ({
      ...acc,
      [item[key]]: (acc[item[key]] || 0) + 1,
    }),
    {}
  );
};

module.exports = {
  log: (input, result) => {
    log.push({ ...input, result });
  },
  get averageAge() {
    if (log.length > 0) {
      const sumAges = log.reduce(
        (acc, { dateOfBirth }) => (acc += _calculateAge(dateOfBirth)),
        0
      );
      return sumAges / log.length;
    }
    return 0;
  },
  get distribution() {
    const dist = distributionBy("result");
    return dist;
  },

  get countryDistribution() {
    const dist = distributionBy("country");
    return dist;
  },
  get list() {
    return log;
  },
};
