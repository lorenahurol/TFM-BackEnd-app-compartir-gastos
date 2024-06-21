/**
* @swagger
* components:
*   securitySchemes:
*     Authorization:
*       type: http
*       scheme: bearer
*       bearerFormat: JWT
*   schemas:
*     Message:
*       type: object
*       required:
*           - group_id
*           - user_id
*           - message
*       properties:
*         group_id:
*           type: int
*           description: The group id of the message
*         user_id:
*           type: int
*           description: The user id of the message
*         message:
*           type: string
*           description: The message content
*       example:
*           group_id: 1
*           user_id: 2
*           message: "Hello" 
*/
const router = require('express').Router();
const { getAllMsgsByGroup, getAllMsgsByGroupAndUser, getMsgByID, createMsg, 
    updateMsg, deleteMsg } = require('../../controllers/messages.controller');

// Operaciones por grupo --------------------------------------------------------------------

//Obtener todos los mensajes de un grupo
/**
* @swagger
* /api/messages/bygroup/{groupId}:
*   get:
*     summary: Get all messages by group
*     tags: [Message]
*     security:
*       - Authorization: []
*     parameters:
*       - in: path
*         name: groupId
*         schema:
*           type: number
*           required: true
*         description: The group id of the messages
*     responses:
*       200:
*         description: The list of messages by group
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Message'
*       500:
*         description: Unexpected error
*/
router.get('/bygroup/:groupId', getAllMsgsByGroup);

//Obtener todos los mensajes por grupo y por usuario
/**
* @swagger
* /api/messages/bygroup/byuser/{groupId}/{userId}:
*  get:
*    summary: Get all messages by group and user
*    tags: [Message]
*    security:
*      - Authorization: []
*    parameters:
*      - in: path
*        name: groupId
*        schema:
*          type: number
*          required: true
*        description: The group id of the messages
*      - in: path
*        name: userId
*        schema:
*          type: number
*          required: true
*        description: The user id of the messages
*    responses:
*      200:
*        description: The list of messages by group and user
*        content:
*          application/json:
*            schema:
*              type: array
*              items:
*                $ref: '#/components/schemas/Message'
*      500:
*        description: Unexpected error
*/
router.get('/bygroup/byuser/:groupId/:userId', getAllMsgsByGroupAndUser);

// CRUD mensajes --------------------------------------------------------------------------
/**
* @swagger
* /api/messages/{id}:
*  get:
*    summary: Get a message by id
*    tags: [Message]
*    security:
*      - Authorization: []
*    parameters:
*      - in: path
*        name: id
*        schema:
*          type: number
*        required: true
*        description: The message id
*    responses:
*      200:
*        description: The message by id
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/Message'
*      404:
*        description: Selected Id does not exist
*      500:
*        description: Unexpected error
*/
router.get("/:id", getMsgByID);

/**
* @swagger
* /api/messages:
*  post:
*    summary: Create a new message
*    tags: [Message]
*    security:
*      - Authorization: []
*    requestBody:
*      required: true
*      content:
*        application/json:
*          schema:
*            $ref: '#/components/schemas/Message'
*    responses:
*      200:
*        description: The message created
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/Message'
*      400:
*        description: No se ha podido insertar el mensaje
*      404:
*        description: No se ha podido recuperar el mensaje tras insertar en BD
*      500:
*        description: Unexpected error
*/
router.post('/', createMsg);

/**
* @swagger
* /api/messages/{id}:
*  put:
*    summary: Update a message by id
*    tags: [Message]
*    security:
*      - Authorization: []
*    parameters:
*      - in: path
*        name: id
*        schema:
*          type: number
*        required: true
*        description: The message id
*    requestBody:
*      required: true
*      content:
*        application/json:
*          schema:
*            $ref: '#/components/schemas/Message'
*    responses:
*      200:
*        description: The result of message updated
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/Result'
*      500:
*        description: Unexpected error
*/
router.put('/:id', updateMsg);

/**
* @swagger
* /api/messages/{id}:
*  delete:
*    summary: Delete a message by id
*    tags: [Message]
*    security:
*      - Authorization: []
*    parameters:
*      - in: path
*        name: id
*        schema:
*          type: number
*        required: true
*        description: The message id
*    responses:
*      200:
*        description: The result of message deleted
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                message:
*                  type: string
*                  description: Se ha borrado el mensaje
*      500:
*        description: Unexpected error
* 
*/
router.delete('/:id', deleteMsg);


module.exports = router;
