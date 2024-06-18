const Expenses = require('../models/expense.model');
const dayjs = require('dayjs');

// ------------------------------------------------------------------------------------------
// ----------- OPERACIONES POR GRUPO  -------------------------------------------------------
// ------------------------------------------------------------------------------------------

//Obtener todos los gastos de un grupo
const getAllExpensesByGroup = async(req, res) => {
    try {
        const [result] = await Expenses.getAllOfGroup(req.params.groupId);
        if (!result[0]) 
        {
            return res.status (404).json({error:"Selected Id does not exist"});
        }
        res.json(result);
    } catch (error) {
        res.json(error);
    }
};


//Obtener todos los gastos Activos por grupo
const getAllActiveExpensesByGroup = async(req, res) => {
    try {
        const [result] = await Expenses.getAllOfGroupActives(req.params.groupId);
        if (!result) 
        {
            return res.status (404).json({error:"Selected Id does not exist"});
        }
        res.json(result);
    } catch (error) {
        res.json(error);
    }
};

//Obtener todos los gastos Activos por grupo y por usuario
const getAllActiveExpensesByGroupAndUser = async(req, res) => {
    try {
        const [result] = await Expenses.getAllOfUserofGroupActives(req.params.groupId, req.params.userId);
        if (!result[0]) 
        {
            return res.status (404).json({error:"Any selected Ids do not exist"});
        }
        res.json(result);
    } catch (error) {
        res.json(error);
    }
};

//Obtener el total de los gastos del grupo ordenador por usuario pagador
const getTotalExpensesOfGroupByUser = async(req, res) => {
    try {
        const [result] = await Expenses.getTotalExpensesOfGroupByUser(req.params.groupId);
        if (!result[0]) 
        {
                return res.status (404).json({error:"Selected Id does not exist"});
        }
        res.json(result);
    } catch (error) {
        res.json(error);
    }
};

// Desactivar todos los gastos de un grupo
const deactivateExpensesByGroupId = async (req, res) => {
    try {
        const [result] = await Expenses.deactivateByGroupId(req.body.groupId);
        if (result.changedRows !== 0) {
            return res.json({ success: true })
        } else {
            return res.json({ success: false })
        };
    } catch (err) {
        res.json(err.error);
    }
};


// ------------------------------------------------------------------------------------------
// ----------- CRUD DE GASTOS ---------------------------------------------------------------
// ------------------------------------------------------------------------------------------

// Obtener gasto individual
const getExpenseById = async (req, res) => {
    try {
        const [[result]] = await Expenses.getById(req.params.id);
        if (!result) 
        {
            return res.status (404).json({error:"Selected Id does not exist"});
        }
        result.date = dayjs(result.date).format('YYYY-MM-DD');
        res.json(result);
    } catch (error) {
        res.json(error);
    }
};


// Creacion nuevo gasto
const createExpense = async (req, res) => {
    try {
        const [result] = await Expenses.create(req.body);
        res.json(result);
    } catch (err) { 
        res.json(err);
    }
};

// edicion por id
const updateExpense = async (req, res) => {
    try {
        const [result] = await Expenses.update(req.params.id, req.body);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
};

// delete por id
const deleteExpense = async (req, res) => {
    try {
        const [result] = await Expenses.deleteById(req.params.id);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
};


//--------------------------------------------------------------------------------------
// --------------------  Pagos ---------------------------------------------------------
//--------------------------------------------------------------------------------------

// Obtener todos los pagos de un grupo
const getAllPaymentsByGroup = async (req, res) => {
    try {
        const [result] = await getAllPaymentOfGroup(req.params.groupId);
        if (!result[0]) 
        {
            return res.status (404).json({error:"Selected Id does not exist"});
        }
        res.json(result);
    } catch (error) {
      res.json(error);
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