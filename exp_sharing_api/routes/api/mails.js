/**
 * @swagger
 * components:
 *   schemas:
 *     Email:
 *       type: object
 *       required:
 *         - bcc
 *         - subject
 *         - template
 *       properties:
 *         bcc:
 *           type: string
 *           description: An array of recipient user IDs.
 *         subject:
 *           type: string
 *           description: Subject of the email.
 *         template:
 *           type: int
 *           description: The selected email template to be used    
 *       example:
 *         bcc: [102, 5, 7]
 *         subject: Test group
 *         template: welcome
 */


const router = require('express').Router();
const { sendMail } = require('../../controllers/mails.controller');


// Creacion nuevo email

/**
 * @swagger
 * tags:
 *   name: Email
 *   description: The Email managing API
 * /mails:
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
 *
 */
router.post('/', sendMail);

module.exports = router;


