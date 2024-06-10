const router = require('express').Router();
const {login, verifyToken} = require('../../controllers/login.controller');

router.post("/", login);
router.get("/:token", verifyToken);

module.exports = router;