const Jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  
  if (!req.headers['authorization']) res.status(403).json({ error: "Invalid API key" });
  
  const token = req.headers["authorization"];

  let payload
  try {
    payload = Jwt.verify(token, process.env.PRIVATE_KEY);
  } catch (error) {
    return res.json ({error: error})
  }

  req.user = { id: 106, username: "mik_cervantes", name: "Miguel" };

  next();
};

module.exports = { checkToken };
