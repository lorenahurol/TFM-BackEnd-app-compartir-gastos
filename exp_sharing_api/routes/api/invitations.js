/**
 * @swagger
 * components:
 *   securitySchemes:
 *     Authorization:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Invitation:
 *       type: object
 *       required:
 *         - id
 *         - date
 *         - group_id
 *         - user_id
 *         - accepted
 *         - active
 *       properties:
 *         id:
 *           type: int
 *           description: The auto-generated id of the invitation
 *         date:
 *           type: datetime
 *           description: The current timestamp
 *         group_id:
 *           type: int
 *           description: The id of the group has been invited
 *         user_id:
 *           type: int
 *           description: the id of the user has been invited
 *         accepted:
 *           type: int
 *           description: State of the invitation (1 - accepted 0- refused)   
 *         active:
 *           type: int
 *           description: State of the invitation (1 - active 0- desactive)
 *         message:
 *           type: string
 *           description: Message of the invitation         
 *       example:
 *         id: 13
 *         date: 01/23/2024
 *         group_id: 12
 *         user_id: 23
 *         accepted: 0
 *         active: 1
 *         message: Invitacion de prueba
 */

const router = require('express').Router();
const {getAllInvitations, getInvitationById, getInvitationsByUser, getInvitationsByGroupAnduser, createInvitation, updateInvitation, deleteInvitationById } = require('../../controllers/invitations.controller');
const { checkIsAdmin, checkIsAdminIdInvitation } = require("../../common/middlewares");


// Requests for /api/invitations:

// Get all existing (active) invitations:
/**
* @swagger
* tags:
*   name: Invitation
*   description: The Invitation managing API
* /api/invitations:
*   get:
*     summary: Lists all invitations
*     tags: [Invitation]
*     security:
*       - Authorization: []
*     responses:
*       200:
*         description: The list of invitations
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Invitation'
*       500:
*         description: Some server error
*/
router.get("/", getAllInvitations);

// Get by Id:
/**
* @swagger
* tags:
*   name: Invitation
*   description: The Group managing API
* /api/invitations/{id}:
*   get:
*     summary: Get a Invitation by Id
*     tags: [Invitation]
*     security:
*       - Authorization: []
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: number
*         required: true
*         description: The invitation id
*     responses:
*       200:
*         description: The invitation with the specific Id
*         content:
*           application/json:
*             schema:
*                 $ref: '#/components/schemas/Invitation'
*       500:
*         description: Some server error
*/
router.get("/:invitationId", getInvitationById);

// Get by User:
/**
* @swagger
* tags:
*   name: Invitation
*   description: The Group managing API
* /api/invitations/byuser/{id}:
*   get:
*     summary: Get the Invitations by userId
*     tags: [Invitation]
*     security:
*       - Authorization: []
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: number
*         required: true
*         description: The user id
*     responses:
*       200:
*         description: The invitations from the user
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Invitation'
*       500:
*         description: Some server error
*/
router.get("/byuser/:userId", getInvitationsByUser);

// Get by Group and User:
/**
* @swagger
* tags:
*   name: Invitation
*   description: The Group managing API
* /api/invitations/bygroupanduser/{groupId}/{userId}:
*   get:
*     summary: Get a Invitation by Id
*     tags: [Invitation]
*     security:
*       - Authorization: []
*     parameters:
*       - in: path
*         name: groupId
*         schema:
*           type: number
*         required: true
*         description: The group id
*       - in: path
*         name: userId
*         schema:
*           type: number
*         required: true
*         description: The user id
*     responses:
*       200:
*         description: The invitation with the specific groupId and userId
*         content:
*           application/json:
*             schema:
*                 $ref: '#/components/schemas/Invitation'
*       500:
*         description: Some server error
*/
router.get("/bygroupanduser/:groupId/:userId", getInvitationsByGroupAnduser);

// Create an invitation (By Group Admin):
/**
 * @swagger
 * tags:
 *   name: Invitation
 *   description: The Invitation managing API
 * /api/invitations:
 *   post:
 *     summary: Create a new invitation
 *     tags: [Invitation]
 *     security:
 *       - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Invitation'
 *     responses:
 *       200:
 *         description: The created invition.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invitation'
 *       500:
 *         description: Some server error
 *
 */
router.post("/", checkIsAdmin, createInvitation);

// Update invitation by Id.

/**
 * @swagger
 * tags:
 *   name: Group
 *   description: The Group managing API
 * /api/invitations/{id}:
 *   put:
 *     summary: Update a group by id
 *     tags: [Invitation]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The invitation id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Invitation'
 *     responses:
 *       200:
 *         description: The created invitation.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invitation'
 *       500:
 *         description: Some server error
 *
 */
router.put("/", updateInvitation);

// Delete an invitation (By Group Admin):

/**
 * @swagger
 * tags:
 *   name: Invitation
 *   description: The Invitation managing API
 * /api/invitations/{id}:
 *   delete:
 *     summary: Delete a invitation by id (desactive)
 *     tags: [Invitation]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The invitation id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Invitation'
 *     responses:
 *       200:
 *         description: The invitation has been deleted successfully.
 *       500:
 *         description: Some server error
 *
 */
router.delete("/:invitationId", checkIsAdminIdInvitation, deleteInvitationById);

module.exports = router;