const router = require('express').Router();
const { getAllExpensesByGroup, getAllActiveExpensesByGroup, getAllActiveExpensesByGroupAndUser, getTotalExpensesOfGroupByUser, desactiveExpensesByGroupId,
    getExpenseById, createExpense, updateExpense, deleteExpense, getAllPaymentsByGroup  } = require('../../controllers/expenses.controller');
const { checkBelongsToGroup, checkIsAdmin, checkIsAdminIdExpense } = require('../../common/middlewares');

// Operaciones por grupo --------------------------------------------------------------------

router.get('/bygroup/all/:groupId', checkBelongsToGroup, getAllExpensesByGroup);

//Obtener todos los gastos Activos por grupo
router.get('/bygroup/actives/:groupId', checkBelongsToGroup, getAllActiveExpensesByGroup);

//Obtener todos los gastos Activos por grupo y por usuario
router.get('/bygroup/byuser/actives/:groupId/:userId', checkBelongsToGroup, getAllActiveExpensesByGroupAndUser);

//Obtener el total de los gastos del grupo ordenador por usuario pagador
router.get('/bygroup/actives/totalexpensesbyuser/:groupId', getTotalExpensesOfGroupByUser);

// Desactivar todos los gastos de un grupo
router.delete('/bygroup/desactive/:group_id', desactiveExpensesByGroupId);

// Obtener, crear, editar y borrar gasto individual -----------------------------------------

// Obtener gasto individual
router.get("/:id", getExpenseById);

// Creacion nuevo gasto
router.post('/', checkIsAdmin, createExpense);

// edicion por id
router.put('/:id', checkIsAdmin, updateExpense);

// delete por id
router.delete('/:id', checkIsAdminIdExpense, deleteExpense);


// Pagos -------------------------------------------------------------------------------
router.get('/payments/:groupId', getAllPaymentsByGroup);


module.exports = router;