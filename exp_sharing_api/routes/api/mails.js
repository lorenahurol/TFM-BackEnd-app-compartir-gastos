const router = require('express').Router();
const { sendMail } = require('../../controllers/mails.controller');

// Creacion nuevo email
router.post('/', sendMail);

module.exports = router;


