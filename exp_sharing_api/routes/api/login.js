

const router = require('express').Router();
const {login, verifyToken} = require('../../controllers/login.controller');


  /**
 * @swagger
 * tags:
 *   name: Login
 *   description: The Login managing API
 * /api/login:
 *   post:
 *     summary: Logs in to the apop ang gets a login auth token
 *     tags: [Login]
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
 *               password:
 *                 type: string
 *                 description: User's password
 *               rememberMe:
 *                 type: boolean
 *                 description: if true, token expiration is set to 14 days, otherwise is set to 1 day
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
 *                   description: Success message
 *                 token:
 *                   type: string
 *                   description: login token
 *       500:
 *         description: Server Error
 */
router.post("/", login);

/**
 * @swagger
 * tags:
 *   name: Login
 *   description: The Login managing API
 * /api/login/{token}:
 *   get:
 *     summary: Checks if a provided token is valid
 *     tags: [Login]
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token to be validated
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
 *               password:
 *                 type: string
 *                 description: User's password
 *               rememberMe:
 *                 type: boolean
 *                 description: If true, token expiration is set to 14 days, otherwise is set to 1 day
 *     responses:
 *       200:
 *         description: Success
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 exp: 
 *                   type: number
 *                   description: Expiration date (unix)
 *                 id:
 *                   type: number
 *                   description: Logged user id
 *                 username:
 *                   type: string
 *                   description: Logged user username
 *                 name:
 *                   type: string
 *                   description: Logged user first name
 *       500:
 *         description: Server Error
 */
router.get("/:token", verifyToken);

module.exports = router;