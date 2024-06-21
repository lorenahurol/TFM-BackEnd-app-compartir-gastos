const bcrypt = require('bcryptjs')

const User = require("../models/user.model");
const {createToken} = require('../common/JWTLogin')


/**
 * GET /checkUsername/:username
 * 
 * Endpoint to check if a username already exists.
 * Fetches the username from the database and returns whether it exists.
 * 
 * @param {string} req.params.username - The username to be checked.
 * @returns {Promise<void>} - Returns a JSON response indicating whether the username exists or an error if the request fails.
 * 
 */
const existUsername = async (req, res, next) => {
    const username = req.params.username
  try {
      const [result] = await User.getFirstUsername(username)
      return (result.length !== 0) ? res.json({ exists: true }) : res.json({exists: false})
  } catch (err) {
      next(err)
  }
};

/**
 * GET /checkMail/:mail
 * 
 * Endpoint to check if an email adress already exists and the user is active.
 * Fetches the user email from the database and returns whether it exists and it's active.
 * 
 * @param {string} req.params.mail - The email to be checked.
 * @returns {Promise<void>} - Returns a JSON response assigning the following values:
 *      {active : null} -> the email does not exist.
 *      {active : true} -> the email exists and the user is active.
 *      {active : false} -> the email exists but the user has unsubscribed.
 */
const existMail = async (req, res, next) => {
    const mail = req.params.mail
    try {
        const [[result]] = await User.getActiveByMail(mail)
        if (!result) return res.json({ active: null })
        if (result.active === 0) return res.json({ active: false })
        if (result.active === 1) return res.json({ active: true })
    } catch (err) {
        next(err)
    }
};
  
/**
 * POST /
 * 
 * Endpoint to create a new user.
 * Encrypts the user's password, saves the user in the database, and returns the created user.
 * 
 * @param {string} req.body.password - User's password to be encrypted.
 * @returns {Promise<void>} - Returns a JSON response with the new user or an error in case of failure.
 * 
 * @async
 */
const createNewUser = async (req, res, next) => {
    // Password encryption
    req.body.password = bcrypt.hashSync(req.body.password)
    try {
    const [result] = await User.create(req.body);
    const newUserId = result.insertId
    const [[newUser]] = await User.getById(newUserId)

    let rememberMe = false
    res.json({
        success: "Registration successfull",
        token: createToken(newUser, rememberMe),
    });
    
    } catch (err) { 
        next(err);
    }
};

module.exports = {
    existUsername,
    existMail,
    createNewUser
}