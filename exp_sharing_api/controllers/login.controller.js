const bcrypt = require('bcryptjs');
const Jwt = require("jsonwebtoken");

const { getByMail } = require("../models/user.model");
const { createToken } = require('../common/JWTLogin');

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
const login = async (req, res, next) => {
    try {
      const { mail, password, rememberMe } = req.body;
      if (!mail || !password) throw new Error();
  
      // Checks if selected mail exists
      const [[user]] = await getByMail(mail);
      if (!user) res.status(401).json({ error: "User not exists" });
      
      // Checks if the user has unsuscribed
      if (!user.active) res.status(401).json({ error: "User is not active" });
      
      // Checks if the password is correct
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) res.status(401).json({ error: "Incorrect email, or password" });
  
      res.json({
        success: "Login successfull",
        token: createToken(user, rememberMe)
      });
    } catch (error) {
      next(error);
    }
  };
  
  /**
   * Verifies a JWT token and returns its payload.
   * 
   * @param {Request} req - The incoming HTTP request object.
   * @param {Response} res - The outgoing HTTP response object.
   * @returns {void} - If the verification is correct, returns an object with the payload:
   * {"exp": expiration date (unix), 
   *  "id": logged user id, 
   *  "username": logged username, 
   *  "name": name of logged user, 
   *  "iat": emission date (unix)}
   * @throws {Error} - If token verification fails (e.g., invalid signature, expired token).
   */
  const verifyToken = (req, res) => {
    const { token } = req.params
    let payload;
    try {
      payload = Jwt.verify(token, process.env.PRIVATE_KEY);
    } catch (error) {
      return res.json({ error: error });
    }
    res.json (payload)
  };

  module.exports = { login, verifyToken };