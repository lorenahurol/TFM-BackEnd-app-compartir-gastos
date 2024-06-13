const router = require('express').Router();
const { getAllUser, getAllActiveUsersByGroup, getAllUsersByGroup, getUserById, getUserByUsername, getFilteredUsernames,
  updateUser, updatePass, deleteUser } = require('../../controllers/users.controller');


// operaciones de grupo
router.get('/', getAllUser);
router.get("/bygroup/:groupId", getAllActiveUsersByGroup);
router.get("/members/bygroup/:groupId", getAllUsersByGroup);


// CRUD de usuario
router.get("/:userId", getUserById);
router.get("/byusername/:username", getUserByUsername);
router.get("/filteredusernames/:username", getFilteredUsernames);
router.put('/update', updateUser);
router.put("/updatePwd", updatePass);
router.delete('/:userId', deleteUser);


module.exports = router;