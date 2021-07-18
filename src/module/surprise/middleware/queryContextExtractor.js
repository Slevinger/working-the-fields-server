module.exports = (req, res, next) => {
  try {
    const { name, dob, country } = req.params;
    req.ctx = { name, dateOfBirth: new Date(dob), country };

    next();
  } catch (e) {
    next(e);
  }
};
