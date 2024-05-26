const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  const verifyToken = jwt.verify(token);
  console.log(verifyToken);
  next();
};

module.exports = { checkToken };
