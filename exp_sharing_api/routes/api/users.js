const router = require('express').Router();
const { getAllUser, getAllActiveUsersByGroup, getAllUsersByGroup, getUserById, getUserByUsername,
  updateUser, updatePass, deleteUser } = require('../../controllers/users.controller');


// operaciones de grupo
router.get('/', getAllUser);
router.get("/bygroup/:groupId", getAllActiveUsersByGroup);
router.get("/members/bygroup/:groupId", getAllUsersByGroup);


// CRUD de usuario
router.get("/:userId", getUserById);
router.get("/byusername/:username", getUserByUsername);
router.put('/update', updateUser);
router.put("/updatePwd", updatePass);
router.delete('/:id', deleteUser);


module.exports = router;