const router = require("express").Router();
const {getRoles, getAllInfoGroupByUser, getAllGroups, getGroupById, getAllGroupsByUser,
  createGroup, updateGroup, deleteGroupById } = require("../../controllers/groups.controller");
const { checkIsAdmin } = require("../../common/middlewares");

// Peticiones que llegan a /api/groups:

router.get("/roles", getRoles);

// Para obtener la información de un grupo a la que pertenece un ususario
router.get("/getallbyuser", getAllInfoGroupByUser);

// Obtener todos los grupos existentes (activos e inactivos):
router.get("/", getAllGroups);

// Obtener la información de un grupo por id
router.get("/:group_id", getGroupById);

// Obtener todos los grupos en los que se encuentra un usuario
router.get("/all/byuserid/:user_id", getAllGroupsByUser);

// Create-update-delete Group:
router.post("/", createGroup);
router.put("/:group_id", checkIsAdmin, updateGroup);
router.delete("/:group_id", checkIsAdmin, deleteGroupById);

module.exports = router;
