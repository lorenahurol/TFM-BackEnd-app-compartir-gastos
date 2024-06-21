/**
 * @swagger
 * components:
 *   schemas:
 *     Email:
 *       type: object
 *       required:
 *         - bcc
 *         - html
 *         - selectedTemplate
 *         - balance
 *         - grouName
 *       properties:
 *         bcc:
 *           type: array
 *           items:
 *             type: integer
 *           description: An array of user IDs.
 *         html:
 *           type: string
 *           description: Alternative text for the email (overwrites templates).
 *         selectedTemplate:
 *           type: string
 *           description: The selected email template to be used    
 *         balance:
 *           type: object
 *           properties:
 *             user_id: 
 *               type: number
 *               description: User id of members group (used when settling expenses)
 *             group_id: 
 *               type: number
 *               description: Group id (used when settling expenses)
 *             credit: 
 *               type: number
 *               description: Balance of a group member to be paid or received (used when settling expenses)
 *       example:
 *         bcc: [102, 5, 7]
 *         html: "<p><b>Test group</b> html example</p>"
 *         selectedTemplate: "welcome"
 *         balance: 
 *           user_id: 20
 *           group_id: 15
 *           credit: -250.24
 */

const router = require('express').Router();
const { sendMail } = require('../../controllers/mails.controller');

// Creacion nuevo email
/**
 * @swagger
 * tags:
 *   name: Email
 *   description: The Email managing API
 * /api/mails:
 *   post:
 *     summary: Create a new email
 *     tags: [Email]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Email'
 *     responses:
 *       200:
 *         description: The emails have been sent.
 *       500:
 *         description: Some server error
 */

router.post('/', sendMail);

module.exports = router;
