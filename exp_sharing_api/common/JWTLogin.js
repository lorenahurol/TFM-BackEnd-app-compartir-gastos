const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');

const createToken = (user, rememberMe) => {
  // Define la caducidad del token a 14 en caso se reciba el bolleano rememberMe
  const expiration = rememberMe
    ? dayjs().add(14, "day")
    : dayjs().add(1, "day");
  
  const payload = {
    exp: expiration.unix(),
    id: user.id,
    username: user.username,
    name: user.firstname,
  };

  return jwt.sign(payload, process.env.PRIVATE_KEY)
}

module.exports = {createToken}