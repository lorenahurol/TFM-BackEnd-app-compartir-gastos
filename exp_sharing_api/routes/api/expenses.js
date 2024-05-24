const router = require('express').Router();
const { getById, getAll, getAllOfGroup, getAllOfGroupActives, getAllOfUserofGroupActives,
    create, update, deleteById, getAllPaymentOfGroup} = require('../../models/expense.model');

// Operaciones por grupo --------------------------------------------------------------------

//Obtener todos los gastos por grupo
router.get('/bygroup/all/:groupId', (req, res) => {
    getAllOfGroup(req.params.groupId)
        .then((data) => {
            res.json(data[0]);
        })
        .catch((err) => {
            res.json(err);
        });
});

//Obtener todos los gastos Activos por grupo
router.get('/bygroup/actives/:groupId', (req, res) => {
    getAllOfGroupActives(req.params.groupId)
        .then((data) => {
            res.json(data[0]);
        })
        .catch((err) => {
            res.json(err);
        });
});

//Obtener todos los gastos Activos por grupo y por usuario
router.get('/bygroup/byuser/actives/:groupId/:userId', (req, res) => {
    getAllOfUserofGroupActives(req.params.groupId, req.params.userId)
        .then((data) => {
            res.json(data[0]);
        })
        .catch((err) => {
            res.json(err);
        });
});

// ------------------------------------------------------------------------------------------

// Obtener, crear, editar y borrar gasto individual -----------------------------------------

// Consultar por id
router.get('/:id', (req, res) => {
    getById(req.params.id)
        .then((data) => {
            res.json(data[0]);
        })
        .catch((err) => {
            res.json(err);
        });
});

// Creacion nuevo gasto
router.post('/', async (req, res) => {
    try {
        const [result] = await create(req.body);
        res.json(result);
    } catch (err) { 
        res.json(err);
    }
});

// edicion por id
router.put('/:id', async (req, res) => {
    try {
        const [result] = await update(req.params.id, req.body);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
});

// delete por id
router.delete('/:id', async (req, res) => {
    try {
        const [result] = await deleteById(req.params.id);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
});
//--------------------------------------------------------------------------------------

// Pagos -------------------------------------------------------------------------------
router.get('/payments/:groupId', (req, res) => {
    getAllPaymentOfGroup(req.params.groupId)
        .then((data) => {
            res.json(data[0]);
        })
        .catch((err) => {
            res.json(err);
        });
});

// --------------------------------------------------------------------------------------

module.exports = router;