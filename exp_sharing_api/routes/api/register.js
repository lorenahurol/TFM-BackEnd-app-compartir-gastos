const router = require('express').Router();
const bcrypt = require('bcryptjs')

const { create , getById } = require("../../models/user.model");
const {createToken} = require('../../common/JWTLogin')

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