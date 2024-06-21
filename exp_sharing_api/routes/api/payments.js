/**
 * @swagger
 * components:
 *   securitySchemes:
 *     Authorization:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Payment:
 *       type: object
 *       required:
 *         - id
 *         - groups_id
 *         - users_id
 *         - amount
 *         - date
 *       properties:
 *         id:
 *           type: int
 *           description: The auto-generated id of the book
 *         groups_id:
 *           type: int
 *           description: The group id of the payment
 *         users:
 *           type: int
 *           description: The user id of the payer
 *         amount:
 *           type: float
 *           description: The amount of the payment
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date of the payment
 *       example:
 *          id: 1,
 *          groups_id: 2,
 *          users_id: 13,
 *          amount: 13.33,
 *          date: 2023-12-31 11:11:11
 */


const router = require('express').Router();
const { getAllPaymentsByGroup, getPaymentById, createPayment, updatePayment,
    deletePayment } = require('../../controllers/payments.controller');

//Obtener todos los pagos de un grupo

/**
* @swagger
* tags:
*   name: Payment
*   description: The Payment managing API
* /api/payments/bygroup/{groupId}:
*   get:
*     summary: Lists all payments by group
*     tags: [Payment]
*     security:
*       - Authorization: []
*     responses:
*       200:
*         description: The list of payments by group
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Payment'
*       500:
*         description: Some server error
*/
router.get('/bygroup/:groupId', getAllPaymentsByGroup);

// CRUD de payment

/**
* @swagger
* /api/payments/{id}:
*   get:
*     summary: Get a payment by Id
*     tags: [Payment]
*     security:
*       - Authorization: []
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: number
*         required: true
*         description: The payment id
*     responses:
*       200:
*         description: The Payment with specific Id
*         content:
*           application/json:
*             schema:
*                 $ref: '#/components/schemas/Payment'
*/
router.get('/:id', getPaymentById);

/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: The Payment managing API
 * /api/expenses:
 *   post:
 *     summary: Create a new payment
 *     tags: [Payment]
 *     security:
 *       - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     responses:
 *       200:
 *         description: The created payment.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       500:
 *         description: Some server error
 *
 */
router.post('/', createPayment);

/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: The Payment managing API
 * /api/payments/{id}:
 *   put:
 *     summary: Update a payment by id
 *     tags: [Payment]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The payment id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     responses:
 *       200:
 *         description: The update payment.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       400:
 *         description: Se ha producido un error al actualizar
 *       500:
 *         description: Some server error
 *
 */
router.put('/:id', updatePayment);

/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: The Payment managing API
 * /api/payments/{id}:
 *   delete:
 *     summary: Delete a payment by id
 *     tags: [Payment]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The payment id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     responses:
 *       200:
 *         description: Se ha borrado el payment
 *       404:
 *        description: el payment no existe
 *       500:
 *         description: Some server error
 *
 */
router.delete('/:id', deletePayment);

module.exports = router;