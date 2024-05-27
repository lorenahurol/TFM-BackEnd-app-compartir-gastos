const router = require('express').Router();
const bcrypt = require('bcryptjs')

const { getByMail } = require("../../models/user.model");
const {createToken} = require('../../common/JWTLogin')

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

    const token = res.json({
      success: "Login successfull",
      token: createToken(user, rememberMe)
    });
  } catch (error) {
    res.status(401).json({ error: "Incorrect email, or password" });
  }
});


module.exports = router;