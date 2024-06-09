const router = require('express').Router();
const { existUsername, createNewUser } = require('../../controllers/register.controller');

router.get("/checkUsername/:username", existUsername);
router.post('/', createNewUser);

module.exports = router;