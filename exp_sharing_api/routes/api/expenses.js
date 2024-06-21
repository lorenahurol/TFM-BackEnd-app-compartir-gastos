/**
 * @swagger
 * components:
 *   schemas:
 *     Expense:
 *       type: object
 *       required:
 *         - id
 *         - description
 *         - amount
 *         - date
 *         - payer_user_id
 *       properties:
 *         id:
 *           type: int
 *           description: The auto-generated id of the book
 *         description:
 *           type: string
 *           description: The description of the category
 *         amount:
 *           type: float
 *           description: The amount of the expense
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date of the expense
 *         payer_user_id:
 *           type: int
 *           description: The user id of the payer
 *         active:
 *           type: int
 *           description: The status of the expense
 *       example:
 *          id: 1,
 *          group_id: 2,
 *          description: Transporte al aeropouerto,
 *          amount: 13.33,
 *          date: 2023-12-31 11:11:11,
 *          payer_user_id: 2,
 *          active: 1
 */

/** 
 * @swagger
 * components:
 *   schemas:
 *    TotalExpenseByUser:
 *      type: object
 *      required:
 *        - payer_user_id
 *        - total_expenses
 *      properties:
 *        payer_user_id:
 *          type: int
 *          description: The user id of the payer
 *        total_expenses:
 *          type: float
 *          description: The total amount of the expenses
 *      example:
 *       payer_user_id: 1,
 *       total_expenses: 100.00
 */


const router = require('express').Router();
const { getAllExpensesByGroup, getAllActiveExpensesByGroup, getAllActiveExpensesByGroupAndUser, getTotalExpensesOfGroupByUser, deactivateExpensesByGroupId,
    getExpenseById, createExpense, updateExpense, deleteExpense, getAllPaymentsByGroup  } = require('../../controllers/expenses.controller');
const { checkBelongsToGroup, checkIsAdmin, checkIsAdminIdExpense } = require('../../common/middlewares');

// Operaciones por grupo --------------------------------------------------------------------
/**
* @swagger
* tags:
*   name: Expense
*   description: The Expense managing API
* /api/expenses/bygroup/all/{groupId}:
*   get:
*     summary: Lists all expenses by group (including inactive)
*     tags: [Expense]
*     responses:
*       200:
*         description: The list of expenses by group (including inactive)
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Expense'
*/
router.get('/bygroup/all/:groupId', checkBelongsToGroup, getAllExpensesByGroup);

//Obtener todos los gastos Activos por grupo
/**
* @swagger
* tags:
*   name: Expense
*   description: The Expense managing API
* /api/expenses/bygroup/actives/{groupId}:
*   get:
*     summary: Lists all active expenses by group
*     tags: [Expense]
*     responses:
*       200:
*         description: The list of active expenses by group
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Expense'
*/
router.get('/bygroup/actives/:groupId', checkBelongsToGroup, getAllActiveExpensesByGroup);

//Obtener todos los gastos Activos por grupo y por usuario
/**
* @swagger
* tags:
*   name: Expense
*   description: The Expense managing API
* /api/expenses/bygroup/byuser/actives/{groupId}/{userId}:
*   get:
*     summary: Lists all active expenses by group and user
*     tags: [Expense]
*     responses:
*       200:
*         description: The list of active expenses by group and user
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Expense'
*/
router.get('/bygroup/byuser/actives/:groupId/:userId', checkBelongsToGroup, getAllActiveExpensesByGroupAndUser);

//Obtener el total de los gastos del grupo ordenador por usuario pagador
/**
* @swagger
* tags:
*   name: Expense
*   description: The Expense managing API
* /api/expenses/bygroup/actives/totalexpensesbyuser/{groupId}:
*   get:
*     summary: Lists all active expenses in a group by user
*     tags: [Expense]
*     responses:
*       200:
*         description: Lists all active expenses in a group by user
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/TotalExpenseByUser'
*/
router.get('/bygroup/actives/totalexpensesbyuser/:groupId', getTotalExpensesOfGroupByUser);

// Desactivar todos los gastos de un grupo
/**
* @swagger
* tags:
*   name: Expense
*   description: The Expense managing API
* /api/expenses/bygroup/deactivate:
*   put:
*     summary: Deactivate all expenses by group
*     tags: [Expense]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               groupId:
*                 type: int
*                 description: The group id
*     responses:
*       200:
*         description: Deactivate all expenses by group
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                 error:
*                   type: string
*/
router.put('/bygroup/deactivate', deactivateExpensesByGroupId);


// CRUD de gasto ----------------------------------------------------------------------------
/**
* @swagger
* /api/expenses/{id}:
*   get:
*     summary: Get a expense by Id
*     tags: [Expense]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: number
*         required: true
*         description: The expense id
*     responses:
*       200:
*         description: The expense with specific Id
*         content:
*           application/json:
*             schema:
*                 $ref: '#/components/schemas/Expense'
*/
router.get("/:id", getExpenseById);

/**
 * @swagger
 * tags:
 *   name: Expense
 *   description: The Expenses managing API
 * /api/expenses:
 *   post:
 *     summary: Create a new expense
 *     tags: [Expense]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Expense'
 *     responses:
 *       200:
 *         description: The created expense.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
 *       500:
 *         description: Some server error
 *
 */
router.post('/', checkIsAdmin, createExpense);

/**
 * @swagger
 * tags:
 *   name: Expense
 *   description: The Expense managing API
 * /api/expenses/{id}:
 *   put:
 *     summary: Update a expense by id
 *     tags: [Expense]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The expense id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Expense'
 *     responses:
 *       200:
 *         description: The created expense.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
 *       400:
 *         description: Se ha producido un error al actualizar
 *       500:
 *         description: Some server error
 *
 */
router.put('/:id', checkIsAdmin, updateExpense);

/**
 * @swagger
 * tags:
 *   name: Expense
 *   description: The Expense managing API
 * /api/expenses/{id}:
 *   delete:
 *     summary: Delete a expense by id
 *     tags: [Expense]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The expense id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Expense'
 *     responses:
 *       200:
 *         description: Se ha borrado el gasto
 *       404:
 *        description: l gasto no existe
 *       500:
 *         description: Some server error
 *
 */
router.delete('/:id', checkIsAdminIdExpense, deleteExpense);


// Pagos -------------------------------------------------------------------------------------

/**
* @swagger
* tags:
*   name: Expense
*   description: The Expense managing API
* /api/expenses/payments/{groupId}:
*   get:
*     summary: Lists all payments by group
*     tags: [Expense]
*     responses:
*       200:
*         description: The list of payments by group
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Expense'
*/

router.get('/payments/:groupId', getAllPaymentsByGroup);


module.exports = router;