/**
 * @swagger
 * components:
 *   securitySchemes:
 *     Authorization:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Users:
 *       type: object
 *       required:
 *         - id
 *         - mail
 *         - username
 *         - password
 *         - firstname
 *         - lastname
 *         - countryCode
 *         - phone
 *         - image
 *         - active
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the user
 *         mail:
 *           type: string
 *           description: User's email
 *         username:
 *           type: string
 *           description: User's selected username
 *         password:
 *           type: string
 *           description: Encrypted user password
 *         firstname:
 *           type: string
 *           description: User's first name
 *         lastname:
 *           type: string
 *           description: User's last name
 *         countryCode:
 *           type: string
 *           description: Telephone country code
 *         phone:
 *           type: string
 *           description: Telephone
 *         image:
 *           type: string
 *           description: User's image
 *         active:
 *           type: string
 *           description: User's state (1 - active, 0 - deactivated)
 *       example:
 *         id: 98
 *         mail: "rferrand2p@wordpress.com"
 *         username: "rferrand2p"
 *         password: "$2a$10$mW/KU0DD.GzGKAGGaPa6LebjRD3QxhyED1keIiO3wZ4qNvFZrlWyC"
 *         firstname: "Rafi"
 *         lastname: "Ferrand"
 *         countryCode: "+48"
 *         phone: "514 714 9576"
 *         image: "http://dummyimage.com/141x100.png/ff4444/ffffff"
 *         active: 1
 */

const router = require('express').Router();
const { getAllUser, getAllActiveUsersByGroup, getAllUsersByGroup, getUserById, getUserByUsername, getFilteredUsernames,
  updateUser, updatePass, deleteUser } = require('../../controllers/users.controller');

  /**
 * @swagger
 * tags:
 *   name: Users
 *   description: The Users managing API
 * /api/users:
 *   get:
 *     summary: Gets an array with the information of all the users
 *     tags: [Users]
 *     security:
 *       - Authorization: []
 *     parameters:
 *     responses:
 *       200:
 *         description: Success
 *         content: 
 *           application/json:
 *             schema:
 *                type: array
 *                items:
 *                   $ref: '#/components/schemas/Users'
 *       500:
 *         description: Server Error
 */
  router.get('/', getAllUser);


  /**
 * @swagger
 * tags:
 *   name: Users
 *   description: The Users managing API
 * /api/users/{userId}:
 *   get:
 *     summary: Gets the user information by its Id
 *     tags: [Users]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: User id
 *     responses:
 *       200:
 *         description: Success
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       404:
 *         description: Id not found
 *       500:
 *         description: Server Error
 */
router.get("/:userId", getUserById);
  
  /**
 * @swagger
 * tags:
 *   name: Users
 *   description: The Users managing API
 * /api/users/byusername/{username}:
 *   get:
 *     summary: Gets the user information by its username
 *     tags: [Users]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: Username
 *     responses:
 *       200:
 *         description: Success
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       404:
 *         description: Id not found
 *       500:
 *         description: Server Error
 */
router.get("/byusername/:username", getUserByUsername);
  
  /**
 * @swagger
 * tags:
 *   name: Users
 *   description: The Users managing API
 * /api/users/filteredusernames/{username}:
 *   get:
 *     summary: Gets an array of usernames given a partial username filter
 *     tags: [Users]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: Username
 *     responses:
 *       200:
 *         description: Success
 *         content: 
 *           application/json:
 *             schema:
 *                type: array
 *                items: 
 *                  required:
 *                    - id
 *                    - username
 *                  properties:
 *                    id:
 *                      type: integer
 *                      description: The auto-generated id of the user
 *                    username:
 *                      type: string
 *                      description: The username
 *       404:
 *         description: Username not found
 *       500:
 *         description: Server Error
 */
router.get("/filteredusernames/:username", getFilteredUsernames);
  

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The Users managing API
 * /api/users/update:
 *   put:
 *     summary: Updates user's information
 *     tags: [Users]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Bearer token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mail:
 *                 type: string
 *                 description: User's email
 *               username:
 *                 type: string
 *                 description: User's selected username
 *               firstname:
 *                 type: string
 *                 description: User's first name
 *               lastname:
 *                 type: string
 *                 description: User's last name
 *               phone:
 *                 type: string
 *                 description: Telephone
 *               image:
 *                 type: string
 *                 description: User's image
 *     responses:
 *       200:
 *         description: Success
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: True if the operation was successful. Else false
 *       400:
 *         description: Error when updating information
 *       500:
 *         description: Server Error
 */

router.put('/update', updateUser);
  
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The Users managing API
 * /api/users/updatePwd:
 *   put:
 *     summary: Updates user's password
 *     tags: [Users]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Bearer token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: User's new password
 *     responses:
 *       200:
 *         description: Success
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: True if the operation was successful. Else false
 *       500:
 *         description: Server Error
 */

router.put("/updatePwd", updatePass);
  
  /**
 * @swagger
 * tags:
 *   name: Users
 *   description: The Users managing API
 * /api/users/{userId}:
 *   delete:
 *     summary: Performa a logical deletion of a user by it's id
 *     tags: [Users]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: User id
 *     responses:
 *       200:
 *         description: Success
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: True if the operation was successful. 
 *       404:
 *         description: Id not found
 *       500:
 *         description: Server Error
 */
router.delete('/:userId', deleteUser);
  

// ---- Operaciones de grupo ------
  /**
 * @swagger
 * tags:
 *   name: Users
 *   description: The Users managing API
 * /api/users/bygroup/{groupId}:
 *   get:
 *     summary: Gets a list of all the active users belonging to a specific group 
 *     tags: [Users]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: groupId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Group id
 *     responses:
 *       200:
 *         description: Success
 *         content: 
 *           application/json:
 *             schema:
 *                type: array
 *                items:
 *                   $ref: '#/components/schemas/Users'
 *       500:
 *         description: Server Error
 */
router.get("/bygroup/:groupId", getAllActiveUsersByGroup);
  
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The Users managing API
 * /api/users/members/bygroup/{groupId}:
 *   get:
 *     summary: Gets a list of group members
 *     tags: [Users]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: groupId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Group id
 *     responses:
 *       200:
 *         description: Success
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   group_id:
 *                     type: number
 *                     description: Automatically generated id of the group
 *                   user_id:
 *                     type: number
 *                     description: Id of the member (user id)
 *                   percent:
 *                     type: number
 *                     description: Percentage of expenses paid by the specific user (0 if the user has equitable participation)
 *                   equitable:
 *                     type: boolean
 *                     description: 1 if the user participates in an equitable percentage of the expenses, 0 if they participate with a specific percentage
 *       500:
 *         description: Server Error
 */

  router.get("/members/bygroup/:groupId", getAllUsersByGroup);

module.exports = router;