const router = require('express').Router();
const bcrypt = require ('bcryptjs')

const { getAll, getAllbyGroup, getById, updateById, deleteById, getByMail } = require('../../models/user.model');

/**
 * GET /
 * 
 * Endpoint to retrieve all users.
 * Fetches all users from the database and returns the user data.
 *
 * @returns {Promise<void>} - Returns a JSON response with all users or an error in case of failure.
 * 
 * @async
 */
router.get('/', async(req, res) => {
    try {
        const [result] = await getAll();
        res.json(result);
    } catch (error) {
        res.json(error);
}
});


router.get("/bygroup/:groupId", (req, res) => {
  getAllbyGroup(req.params.groupId)
    .then((data) => {
      res.json(data[0]);
    })
    .catch((err) => {
      res.json(err);
    });
});


/**
 * GET /:userId
 * 
 * Endpoint to retrieve a user by their ID.
 * Fetches the user from the database using the provided user ID and returns the user data.
 * 
 * @param {string} req.params.userId - ID of the user to be retrieved from the router params.
 * @returns {Promise<void>} - Returns a JSON response with the user data or an error in case of failure.
 * 
 * @async
 */
router.get("/:userId", async (req, res) => {
  try {
    const [[result]] = await getById(req.params.userId);
    if (!result) return res.status(404).json({ error: "Selected Id does not exist" })
    // modifico el valordel teléfono para separar el código internacional
    const {phone} = result
    const separatorIndex = phone.indexOf(" ");
    result.countryCode = phone.substring(0, separatorIndex);
    result.phone = phone.substring(separatorIndex+1)
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

/**
 * Updates a user by their ID.
 *
 * @param {Request} req - The incoming HTTP request object.
 * @param {Response} res - The outgoing HTTP response object.
 * @returns {success:boolean} - Returns a json withsuccess response (boolean).
 *
 * @throws {Error} - If an error occurs during user update or password hashing.
 *
 */
router.put('/:userId', async (req, res) => {
  try {
    // verifico si la contraseña se ha modificado. Si ha cambiado la encripto antes de guardarla
    const userId = req.params.userId;
    const [[currentUser]] = await getById(userId)
    const currentPassword = currentUser.password
    const newPassword = req.body.password
    if (currentPassword !== newPassword)
      req.body.password = bcrypt.hashSync(newPassword);

    const [result] = await updateById(userId, req.body);
        
    if (!result)
      return res.status(404).json({ error: "Selected Id does not exist" });

    res.json ({success: true})
  } catch (error) {
    res.json(error);
  }
});

router.delete('/:id', async (req, res) => {
    try {
        const [result] = await deleteById(req.params.id);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;