/**
 * @swagger
 * components:
 *  securitySchemes:
 *    Authorization:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *  schemas:
 *    Member:
 *      type: object
 *      required:
 *          - group_id
 *          - user_id
 *          - percent
 *          - equitable
 *      properties:
 *        group_id:
 *          type: int
 *          description: The group id of the member
 *        user_id:
 *          type: int
 *          description: The user id of the member
 *        percent:
 *          type: float
 *          description: The participation in expenses of the member
 *        equitable:
 *          type: int
 *          description: value 1 or 0, if participation in expenses is equitable or not
 *      example:
 *          group_id: 1
 *          user_id: 2
 *          percent: 0
 *          equitable: 1
 */

/**
* @swagger
* components:
*   schemas:
*     Result:
*       type: object
*       properties:
*         fieldCount:
*           type: int
*         affectedRows:
*           type: int
*         insertId:
*           type: int
*         info:
*           type: string
*         serverStatus:
*           type: int
*         warningStatus:
*           type: int
*         changedRows:
*           type: int
*       example:
*         fieldCount: 0
*         affectedRows: 1
*         insertId: 0
*         info: Rows matched 1  Changed 1  Warnings 0
*         serverStatus: 34
*         warningStatus: 0
*         changedRows: 1
*/
const router = require('express').Router();
const { getAllMembersByGroup, getMember, createMember, updateMember, deleteMember} = require('../../controllers/members.controller');
const { checkIsAdmin } = require('../../common/middlewares');

// Operaciones por grupo --------------------------------------------------------------------

/**
* @swagger
* tags:
*   name: Expense
*   description: The Member managing API
* /api/members/bygroup/{groupId}:
*   get:
*     summary: Get all members by group
*     tags: [Member]
*     security:
*       - Authorization: []
*     parameters:
*       - in: path
*         name: groupId
*         schema:
*           type: number
*           required: true
*         description: The group id
*     responses:
*       200:
*         description: The list of members by group
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Member'
*       500:
*         description: Some server error
*/
router.get('/bygroup/:groupId', getAllMembersByGroup);



// CRUD de Miembros ----------------------------------------------------------------------------
/**
* @swagger
* /api/members/{group_id}/{userid}:
*   get:
*     summary: Get a member by group and user id
*     tags: [Member]
*     security:
*       - Authorization: []
*     parameters:
*       - in: path
*         name: group_id
*         schema:
*           type: number
*         required: true
*         description: The group id
*       - in: path
*         name: userid
*         schema:
*           type: number
*         required: true
*         description: The user id
*     responses:
*       200:
*         description: The member info by group and user id
*         content:
*           application/json:
*             schema:
*                 $ref: '#/components/schemas/Member'
*       404:
*         description: Selected Id does not exist
*       500:
*         description: Some server error
*/
router.get('/:group_id/:userid', getMember);

/**
* @swagger
* /api/members:
*   post:
*     summary: Create a new member
*     tags: [Member]
*     security:
*       - Authorization: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Member'
*     responses:
*       200:
*         description: The result of create member.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Result'
*       500:
*         description: Some server error
*/
router.post('/', checkIsAdmin, createMember);

/**
* @swagger
* /api/members/{group_id}/{userid}:
*   put:
*     summary: Update a member by group and user id
*     tags: [Member]
*     security:
*       - Authorization: []
*     parameters:
*       - in: path
*         name: group_id
*         schema:
*           type: number
*         required: true
*         description: The group id
*       - in: path
*         name: userid
*         schema:
*           type: number
*         required: true
*         description: The user id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Member'
*     responses:
*       200:
*         description: The result of update member
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Result'
*       400:
*         description: Error on update, check the data or the id's
*       500:
*         description: Some server error
*/
router.put('/:group_id/:userid', checkIsAdmin, updateMember);

//necesario meter validacion de admin

/**
* @swagger
* /api/members/{group_id}/{userid}:
*   delete:
*     summary: Delete a member by group and user id
*     tags: [Member]
*     security:
*       - Authorization: []
*     parameters:
*       - in: path
*         name: group_id
*         schema:
*           type: number
*         required: true
*         description: The group id
*       - in: path
*         name: userid
*         schema:
*           type: number
*         required: true
*         description: The user id
*     responses:
*       200:
*         description: Se ha borrado el miembro
*       404:
*         description: El miembro no existe
*       500:
*         description: Some server error 
*/
router.delete('/:group_id/:userid', checkIsAdmin, deleteMember);

module.exports = router;