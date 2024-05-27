const router = require('express').Router();
const bcrypt = require('bcryptjs')

const { getByMail } = require("../../models/user.model");
const {createToken} = require('../../common/JWTLogin')

/**
 * POST /
 * 
 * Endpoint to handle user login.
 * Verifies the user's email and password, and returns a token if the login is successful.
 * 
 * @param {string} req.body.mail - User's email.
 * @param {string} req.body.password - User's password.
 * @param {boolean} [req.body.rememberMe] - Optional flag to remember the user (used for token creation).
 * @returns {Promise<void>} - Returns a JSON response with a success message and token, or an error message if the login fails.
 * 
 * @async
 */
router.post("/", async (req, res) => {
  try {
    const { mail, password, rememberMe } = req.body;
    if (!mail || !password) throw new Error();

    // Checks if selected mail exists
    const [[user]] = await getByMail(mail);
    if (!user) throw new Error();

    // Checks if the password is correct
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) throw new Error();

    res.json({
      success: "Login successfull",
      token: createToken(user, rememberMe)
    });
  } catch (error) {
    res.status(401).json({ error: "Incorrect email, or password" });
  }
});


module.exports = router;