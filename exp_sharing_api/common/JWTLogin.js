const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');

const createToken = (user) => {
  const payload = {
    exp: dayjs().add(process.env.TOKEN_EXPIR, 'day'),
    id: user.id,
    username: user.username,
    name: user.firstname
  };

  return jwt.sign(payload, process.env.PRIVATE_KEY)
}

module.exports = {createToken}