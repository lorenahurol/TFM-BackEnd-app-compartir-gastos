const router = require('express').Router();
const dayjs = require('dayjs');
const Expenses = require('../../models/expense.model');
const { checkBelongsToGroup, checkIsAdmin, checkIsAdminIdExpense } = require('../../common/middlewares');

// Operaciones por grupo --------------------------------------------------------------------

router.get('/bygroup/all/:groupId', checkBelongsToGroup, async(req, res) => {
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
});


//Obtener todos los gastos Activos por grupo
router.get('/bygroup/actives/:groupId', checkBelongsToGroup, async(req, res) => {
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
});

//Obtener todos los gastos Activos por grupo y por usuario
router.get('/bygroup/byuser/actives/:groupId/:userId', checkBelongsToGroup, async(req, res) => {
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
});


// ------------------------------------------------------------------------------------------

// Obtener, crear, editar y borrar gasto individual -----------------------------------------

router.get("/:id", async (req, res) => {
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
  });


// Creacion nuevo gasto
router.post('/', checkIsAdmin, async (req, res) => {
    try {
        const [result] = await Expenses.create(req.body);
        res.json(result);
    } catch (err) { 
        res.json(err);
    }
});

// edicion por id
router.put('/:id', checkIsAdmin, async (req, res) => {
    try {
        const [result] = await Expenses.update(req.params.id, req.body);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
});

// delete por id
router.delete('/:id', checkIsAdminIdExpense, async (req, res) => {
    try {
        const [result] = await Expenses.deleteById(req.params.id);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
});
//--------------------------------------------------------------------------------------

// Pagos -------------------------------------------------------------------------------

router.get('/payments/:groupId', async (req, res) => {
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
  });

// --------------------------------------------------------------------------------------

module.exports = router;