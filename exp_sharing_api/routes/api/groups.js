/**
 * @swagger
 * components:
 *   schemas:
 *     Group:
 *       type: object
 *       required:
 *         - id
 *         - description
 *         - category_id
 *         - creator_user_id
 *         - active
 *       properties:
 *         id:
 *           type: int
 *           description: The auto-generated id of the group
 *         description:
 *           type: string
 *           description: The description of the group
 *         category_id:
 *           type: int
 *           description: The id of the category of the group
 *         creator_user_id:
 *           type: int
 *           description: the id of the owner user
*         active:
 *           type: int
 *           description: State of the group (1 - active 0- desactive)      
 *       example:
 *         id: 1
 *         description: Test group
 *         category_id: 1
 *         creator_user_id: 102
 *         active: 1
 */


const router = require("express").Router();
const {getRoles, getAllInfoGroupByUser, getAllInfoGroupById, getAllGroups, getGroupById, getAllGroupsByUser,
  createGroup, updateGroup, deleteGroupById } = require("../../controllers/groups.controller");
const { checkIsAdmin } = require("../../common/middlewares");

// Peticiones que llegan a /api/groups:

/* Obtiene un objeto con dos arrays: grupos de admin y grupos como miembro (
    el usuario lo obtiene del token a través del middelware checktoken */
/**
* @swagger
* tags:
*   name: Group
*   description: The Group managing API
* /api/groups/roles:
*   get:
*     summary: Gets an object with two arrays - groups from admin and groups as member
*     tags: [Group]
*     responses:
*       200:
*         description: The groups a user belongs to
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Group'
*       500:
*         description: Some server error
*/
router.get("/roles", getRoles);

// Para obtener la información de un grupo a la que pertenece un ususario
/**
* @swagger
* tags:
*   name: Group
*   description: The Group managing API
* /api/groups/getallbyuser:
*   get:
*     summary: Get all information of the groups by user logged
*     tags: [Group]
*     responses:
*       200:
*         description: The groups with all information
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Group'
*       500:
*         description: Some server error
*/
router.get("/getallbyuser", getAllInfoGroupByUser);

// Para obtener la información de un grupo por su id
/**
* @swagger
* tags:
*   name: Group
*   description: The Group managing API
* /api/groups/getallinfobyid/{id}:
*   get:
*     summary: Get all information of the group by Id
*     tags: [Group]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: number
*         required: true
*         description: The category id
*     responses:
*       200:
*         description: The group with the specific Id
*         content:
*           application/json:
*             schema:
*                 $ref: '#/components/schemas/Group'
*       500:
*         description: Some server error
*/
router.get("/getallinfobyid/:group_id", getAllInfoGroupById);

// Obtener todos los grupos existentes (activos e inactivos):
/**
* @swagger
* tags:
*   name: Group
*   description: The Group managing API
* /api/groups/:
*   get:
*     summary: Lists all groups (including inactive)
*     tags: [Group]
*     responses:
*       200:
*         description: The list of groups (including inactive)
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Group'
*       500:
*         description: Some server error
*/
router.get("/", getAllGroups);

// Obtener la información de un grupo por id:
/**
* @swagger
* tags:
*   name: Group
*   description: The Group managing API
* /api/groups/{id}:
*   get:
*     summary: Get a group by Id
*     tags: [Group]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: number
*         required: true
*         description: The group id
*     responses:
*       200:
*         description: The group with the specific Id
*         content:
*           application/json:
*             schema:
*                 $ref: '#/components/schemas/Group'
*       500:
*         description: Some server error
*/
router.get("/:group_id", getGroupById);


// Obtener todos los grupos en los que se encuentra un usuario
/**
* @swagger
* tags:
*   name: Group
*   description: The Group managing API
* /api/groups/all/byuserid/{user_id}:
*   get:
*     summary: Get all the groups a user belongs to
*     tags: [Group]
*     parameters:
*       - in: path
*         name: user_id
*         schema:
*           type: number
*         required: true
*         description: The user id
*     responses:
*       200:
*         description: The groups a user belongs to
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Group'
*       500:
*         description: Some server error
*/
router.get("/all/byuserid/:user_id", getAllGroupsByUser);


// Create-update-delete Group:
/**
 * @swagger
 * tags:
 *   name: Group
 *   description: The Group managing API
 * /groups:
 *   post:
 *     summary: Create a new group
 *     tags: [Group]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Group'
 *     responses:
 *       200:
 *         description: The created group.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
 *       500:
 *         description: Some server error
 *
 */
router.post("/", createGroup);


/**
 * @swagger
 * tags:
 *   name: Group
 *   description: The Group managing API
 * /groups/{id}:
 *   put:
 *     summary: Update a group by id
 *     tags: [Group]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The group id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Group'
 *     responses:
 *       200:
 *         description: The created group.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
 *       500:
 *         description: Some server error
 *
 */
router.put("/:group_id", checkIsAdmin, updateGroup);


/**
 * @swagger
 * tags:
 *   name: Group
 *   description: The Group managing API
 * /groups/{id}:
 *   delete:
 *     summary: Delete a group by id (desactive)
 *     tags: [Group]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The group id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Group'
 *     responses:
 *       200:
 *         description: The group has been deleted successfully.
 *       500:
 *         description: Some server error
 *
 */
router.delete("/:group_id", checkIsAdmin, deleteGroupById);


module.exports = router;
