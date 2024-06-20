const bcrypt = require ('bcryptjs')
const Users = require('../models/user.model');

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
        const [result] = await Users.getAll();
        res.json(result);
    } catch (error) {
        next(error);
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
const getAllActiveUsersByGroup = async (req, res, next) => {
  try {
    const [result] = await Users.getAllbyGroup(req.params.groupId);
    res.json(result);
  } catch (error) {
    next(error);
  }
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
const getAllUsersByGroup = async (req, res, next) => {
  try {
    const [result] = await Users.getAllMemberbyGroup(req.params.groupId);
    res.json(result);
  } catch (error) {
    next(error);
  }

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
    const [[result]] = await Users.getById(req.params.userId);
    if (!result) {
      return res.status(404).json({ error: "Selected Id does not exist" })
    } else {
      // modifico el valordel teléfono para separar el código internacional
      const {phone} = result
      const separatorIndex = phone.indexOf(" ");
      result.countryCode = phone.substring(0, separatorIndex);
      result.phone = phone.substring(separatorIndex+1)
      res.json(result);
    }
  } catch (error) {
    next(error);
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
    const [[result]] = await Users.getByUsername(req.params.username);
    if (!result) return res.status(404).json({ error: "Selected username does not exist" })
    res.json(result);
  } catch (error) {
    next(error);
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
    const [result] = await Users.getUsernamesList(req.params.username);
    res.json(result);
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

    const [result] = await Users.updateById(userId, req.body);

    if (result.changedRows === 1) {
      res.json ({success: true})
    } else {
      return res.status(400).json({ error: 'Se ha producido un error al actualizar' });
    }

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

    const result = await Users.updatePassword(userId, hashPassword);

    if (!result)
      return res.status(404).json({ error: "Selected Id does not exist" });

    return res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {  
  try {
    // Verifies that the user requesting the action is the same to be deleted
    if (req.params.userId !== req.user.id.toString())
      return res.status(401).json({ error: "Unauthorized" });
    const [result] = await Users.deleteById(req.params.userId);

    if (result.affectedRows === 1) {
      res.json({ success: true })
    } else {
        res.status(404).json({ message: 'El paciente no existe' });
    }
  } catch (err) {
      next(err);
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