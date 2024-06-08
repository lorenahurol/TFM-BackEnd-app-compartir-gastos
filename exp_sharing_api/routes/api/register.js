const router = require('express').Router();
const bcrypt = require('bcryptjs')

const { create , getById, getFirstUsername} = require("../../models/user.model");
const {createToken} = require('../../common/JWTLogin')

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
router.get("/checkUsername/:username", async (req, res) => {
  const username = req.params.username
try {
    const [result] = await getFirstUsername(username)
    return (result.length !== 0) ? res.json({ exists: true }) : res.json({exists: false})
} catch (err) {
    res.json({err})
}
}
)

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
router.post('/', async (req, res) => {
    // Password encryption
    req.body.password = bcrypt.hashSync(req.body.password)
    try {
      const [result] = await create(req.body);
      const newUserId = result.insertId
      const [[newUser]] = await getById(newUserId)

      let rememberMe = false
      res.json({
        success: "Registration successfull",
        token: createToken(newUser, rememberMe),
      });
      
    } catch (err) { 
        res.json(err);
    }
});


module.exports = router;