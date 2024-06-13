const router = require('express').Router();
const { existUsername, createNewUser, existMail } = require('../../controllers/register.controller');

router.get("/checkUsername/:username", existUsername);
router.get("/checkMail/:mail", existMail);
router.post('/', createNewUser);

module.exports = router;