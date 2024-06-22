const Expenses = require('../models/expense.model');
const dayjs = require('dayjs');

// ------------------------------------------------------------------------------------------
// ----------- OPERACIONES POR GRUPO  -------------------------------------------------------
// ------------------------------------------------------------------------------------------

//Obtener todos los gastos de un grupo
const getAllExpensesByGroup = async (req, res, next) => {
    try {
        const [result] = await Expenses.getAllOfGroup(req.params.groupId);

        res.json(result);
    } catch (error) {
        next(error);
    }
};


//Obtener todos los gastos Activos por grupo
const getAllActiveExpensesByGroup = async (req, res, next) => {
    try {
        const [result] = await Expenses.getAllOfGroupActives(req.params.groupId);

        res.json(result);
    } catch (error) {
        next(error);
    }
};

//Obtener todos los gastos Activos por grupo y por usuario
const getAllActiveExpensesByGroupAndUser = async (req, res, next) => {
    try {
        const [result] = await Expenses.getAllOfUserofGroupActives(req.params.groupId, req.params.userId);

        res.json(result);
    } catch (error) {
        next(error);
    }
};

//Obtener el total de los gastos del grupo ordenador por usuario pagador
const getTotalExpensesOfGroupByUser = async (req, res, next) => {
    try {
        const [result] = await Expenses.getTotalExpensesOfGroupByUser(req.params.groupId);

        res.json(result);
    } catch (error) {
        next(error);
    }
};

// Desactivar todos los gastos de un grupo
const deactivateExpensesByGroupId = async (req, res, next) => {
    try {
        const [result] = await Expenses.deactivateByGroupId(req.body.groupId);
        if (result.changedRows !== 0) {
            return res.json({ success: true })
        } else {
            return res.json({ success: false, error: 'Expenses not found' })
        };
    } catch (error) {
        next(error);
    }
};


// ------------------------------------------------------------------------------------------
// ----------- CRUD DE GASTOS ---------------------------------------------------------------
// ------------------------------------------------------------------------------------------

// Obtener gasto individual
const getExpenseById = async (req, res, next) => {
    try {
        const [result] = await Expenses.getById(req.params.id);
        if (result.length === 0) {
            return res.status (404).json({error:"Selected Id does not exist"});
        }
        result.date = dayjs(result.date).format('YYYY-MM-DD');
        res.json(result[0]);
    } catch (error) {
        next(error);
    }
};


// Creacion nuevo gasto
const createExpense = async (req, res, next) => {
    try {
        const [result] = await Expenses.create(req.body);
        res.json(result);
    } catch (err) { 
        next(err);
    }
};

// edicion por id
const updateExpense = async (req, res, next) => {
    try {
        const [result] = await Expenses.update(req.params.id, req.body);
        if (result.changedRows === 1) {
            res.json(result);
        } else {
            res.status(400).json({ error: 'Se ha producido un error al actualizar' });
        }
        
    } catch (err) {
        next(err);
    }
};

// delete por id
const deleteExpense = async (req, res, next) => {
    try {
        const [result] = await Expenses.deleteById(req.params.id);

        if (result.affectedRows === 1) {
            // añadir mensaje de borrado a objeto result
            result.message = 'Se ha borrado el gasto';
        } else {
            res.status(404).json({ message: 'El gasto no existe' });
        }
        res.json(result);
    } catch (err) {
        next(err);
    }
};


//--------------------------------------------------------------------------------------
// --------------------  Pagos ---------------------------------------------------------
//--------------------------------------------------------------------------------------

// Obtener todos los pagos de un grupo
const getAllPaymentsByGroup = async (req, res, next) => {
    try {
        const [result] = await getAllPaymentOfGroup(req.params.groupId);

        res.json(result);
    } catch (error) {
      next(error);
    }
  };

module.exports = {
    getAllExpensesByGroup, 
    getAllActiveExpensesByGroup, 
    getAllActiveExpensesByGroupAndUser, 
    getTotalExpensesOfGroupByUser, 
    deactivateExpensesByGroupId,
    getExpenseById, 
    createExpense, 
    updateExpense, 
    deleteExpense, 
    getAllPaymentsByGroup
}