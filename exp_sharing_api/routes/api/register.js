const router = require('express').Router();
const { existUsername, createNewUser, existMail } = require('../../controllers/register.controller');

  /**
 * @swagger
 * tags:
 *   name: Register
 *   description: The Registration managing API
 * /api/register/checkUsername/{username}:
 *   get:
 *     summary: Checks if the selected username already exists in database
 *     tags: [Register]
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: Username
 *     responses:
 *       200:
 *         description: Success
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 exists:
 *                   type: boolean
 *                   description: True if the username exists
 *       500:
 *         description: Server Error
 */
router.get("/checkUsername/:username", existUsername);

  /**
 * @swagger
 * tags:
 *   name: Register
 *   description: The Registration managing API
 * /api/register/checkMail/{mail}:
 *   get:
 *     summary: Checks if the selected email already exists in database and the corresponding user is active
 *     tags: [Register]
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
*          required: true
 *         description: auth token
 *     responses:
 *       200:
 *         description: Success
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 active:
 *                   type: boolean
 *                   description: True if the email exists and the user is active, false if the email exists but the user has been deactivated, null is the email does not exist
 *       500:
 *         description: Server Error
 */
router.get("/checkMail/:mail", existMail);

/**
 * @swagger
 * tags:
 *   name: Register
 *   description: The Registration managing API
 * /api/register:
 *   post:
 *     summary: Creates a new user
 *     tags: [Register]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mail:
 *                 type: string
 *                 description: User's email
 *               username:
 *                 type: string
 *                 description: User's selected username
 *               firstname:
 *                 type: string
 *                 description: User's first name
 *               lastname:
 *                 type: string
 *                 description: User's last name
 *               phone:
 *                 type: string
 *                 description: Telephone
 *               image:
 *                 type: string
 *                 description: User's image
 *               password:
 *                 type: string
 *                 description: User's encrypted password
 *     responses:
 *       200:
 *         description: Success
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   description: Successfull registration message
 *                 token:
 *                   type: string
 *                   description: encripted user token
 *       400:
 *         description: Error when updating information
 *       500:
 *         description: Server Error
 */
router.post('/', createNewUser);

module.exports = router;