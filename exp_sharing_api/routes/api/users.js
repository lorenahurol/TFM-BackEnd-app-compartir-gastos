const router = require('express').Router();
const bcrypt = require('bcryptjs')

// const {createToken} = require ('../../common/JWTLogin')

const { getAll, getById, create, update, deleteById, getByMail } = require('../../models/user.model');

// router.post('/login', async (req, res) => {
//     try {
//         const { mail, password } = req.body
//         if (!mail || !password) throw new Error ()
        
//         // Checks if selected mail exists
//         const [[user]] = await getByMail(mail)
//         if (!user) throw new Error();

//         // Checks if the password is correct
//         const validPassword = bcrypt.compareSync(password, user.password);
//         if (!validPassword) throw new Error();
//         const token = 
//         res.json({
//             success: "Login successfull",
//             token: createToken(user)
//         });

//     } catch (error) {
//         res.status(401).json({ error: "Incorrect email, or password" });
//     }; 
// })

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
    if (!result) return res.status (404).json({error:"Selected Id does not exist"})
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});


// /**
//  * POST /
//  * 
//  * Endpoint to create a new user.
//  * Encrypts the user's password, saves the user in the database, and returns the created user.
//  * 
//  * @param {string} req.body.password - User's password to be encrypted.
//  * @returns {Promise<void>} - Returns a JSON response with the new user or an error in case of failure.
//  * 
//  * @async
//  */
// router.post('/', async (req, res) => {
//     // Password encryption
//     req.body.password = bcrypt.hashSync(req.body.password)
//     try {
//       const [result] = await create(req.body);
//       const newUserId = result.insertId
//       const [[newUser]] = await getById(newUserId)

//       let rememberMe = false
//       res.json({
//         success: "Registration successfull",
//         token: createToken(newUser, rememberMe),
//       });

//     } catch (err) { 
//         res.json(err);
//     }
// });

router.put('/:id', async (req, res) => {
    try {
        const [result] = await update(req.params.id, req.body);
        res.json(result);
    } catch (err) {
        res.json(err);
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