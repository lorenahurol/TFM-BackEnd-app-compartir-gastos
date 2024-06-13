const bcrypt = require ('bcryptjs')
const { getAll, getAllbyGroup, getById, getByUsername, getUsernamesList,  updateById, deleteById, 
    updatePassword, getAllMemberbyGroup } = require('../models/user.model');

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
const getAllUser = async(req, res, next) => {
    try {
        const [result] = await getAll();
        return res.json(result);
    } catch (error) {
        return next(error);
    }
};

/**
 * GET /bygroup/:groupId
 * 
 * Endpoint to retrieve the active users belonging to a specific group.
 * Fetches the user from the `users` table who is an active member (active = 1) of the group identified by the provided group ID.
 * The user data is retrieved using a join between the `users` and `group_members` tables.
 * 
 * @param {string} req.params.groupId - ID of the group to retrieve the first active user from.
 * @returns {Promise<object>} - Returns a JSON response containing the user data (if found) or an empty object if no active user exists for the group.
 * 
 * @async
 */
const getAllActiveUsersByGroup = (req, res, next) => {
  getAllbyGroup(req.params.groupId)
    .then((data) => {
      return res.json(data[0]);
    })
    .catch((err) => {
      return next(err);
    });
};

/**
 * GET /members/bygroup/:groupId
 * 
 * Endpoint to retrieve members belonging to a specific group.
 * Fetches a list of members associated with the provided group ID and returns their data.
 * 
 * @param {string} req.params.groupId - ID of the group to retrieve members from.
 * @returns {Promise<void>} - Returns a JSON response containing an array of member data or an error message if unsuccessful.
 * 
 * @async
 */
const getAllUsersByGroup = (req, res, next) => {
  getAllMemberbyGroup(req.params.groupId)
    .then((data) => {
      return res.json(data[0]);
    })
    .catch((err) => {
      return next(err);
    });
};


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
const getUserById = async (req, res, next) => {
  try {
    const [[result]] = await getById(req.params.userId);
    if (!result) return res.status(404).json({ error: "Selected Id does not exist" })
    // modifico el valordel teléfono para separar el código internacional
    const {phone} = result
    const separatorIndex = phone.indexOf(" ");
    result.countryCode = phone.substring(0, separatorIndex);
    result.phone = phone.substring(separatorIndex+1)
    return res.json(result);
  } catch (error) {
    return next(error);
  }
};

/**
 * GET /byusername/:username
 * 
 * Endpoint to retrieve a user by their username.
 * Fetches user data from the database based on the provided username.
 * 
 * @param {string} req.params.username - Username of the user to be retrieved.
 * @returns {Promise<object>} - Returns a JSON response containing the user data (if found) or a 404 "Not Found" error message if the user doesn't exist.
 * 
 * @async
 */
const getUserByUsername = async (req, res, next) => {
  try {
    const [[result]] = await getByUsername(req.params.username);
    if (!result) return res.status(404).json({ error: "Selected username does not exist" })
    return res.json(result);
  } catch (error) {
    return next(error);
  }
};

/**
 * GET /filteredusernames/:username
 * 
 * Endpoint to retrieve a list of active users usernames containing the given partial string.
 * 
 * @param {string} req.params.username - Part of a username of the user to be retrieved.
 * @returns {Promise<object>} - Returns a JSON response containing an array of usernames and corresponding id (if found).
 * 
 * @async
 */
const getFilteredUsernames = async (req, res, next) => {
  try {
    const [result] = await getUsernamesList(req.params.username);
    return res.json(result);
  } catch (error) {
    next(error);
  }
};

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
const updateUser = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const [result] = await updateById(userId, req.body);

    if (!result)
      return res.status(404).json({ error: "Selected Id does not exist" });

    return res.json ({success: true})
  } catch (error) {
    next(error);
  }
};

/**
 * Updates a user's password.
 *
 * @returns {void} - Returns a json object with a boolean {success : true}  
 * @throws {Error} - If an error occurs during password hashing or user update.
 */
const updatePass = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const newPassword = req.body.password
    const hashPassword = bcrypt.hashSync(newPassword, 10);

    const result = await updatePassword(userId, hashPassword);

    if (!result)
      return res.status(404).json({ error: "Selected Id does not exist" });

    return res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  // Verifies that the user requesting the action is the same to be deleted
  if (req.params.userId !== req.user.id.toString())
    return res.status(401).json({ error: "Unauthorized" })
  try {
      const [result] = await deleteById(req.params.userId);
      res.json(result);
  } catch (err) {
      res.json(err);
  }
};

module.exports = {
  getAllUser,
  getAllActiveUsersByGroup,
  getAllUsersByGroup,
  getUserById,
  getUserByUsername,
  getFilteredUsernames,
  updateUser,
  updatePass,
  deleteUser
}