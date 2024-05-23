const router = require('express').Router();
const { getAll, getAllOfGroup, getAllOfGroupActives, getAllOfUserofGroupActives,
    create, update, deleteById} = require('../../models/expense.model');


router.get('/all/:groupId', (req, res) => {
    getAllOfGroup(req.params.groupId)
        .then((data) => {
            res.json(data[0]);
        })
        .catch((err) => {
            res.json(err);
        });
});

router.get('/:groupId', (req, res) => {
    getAllOfGroupActives(req.params.groupId)
        .then((data) => {
            res.json(data[0]);
        })
        .catch((err) => {
            res.json(err);
        });
});


router.get('/:groupId/:userId', (req, res) => {
    getAllOfUserofGroupActives(req.params.groupId, req.params.userId)
        .then((data) => {
            res.json(data[0]);
        })
        .catch((err) => {
            res.json(err);
        });
});


router.post('/', async (req, res) => {
    try {
        const [result] = await create(req.body);
        res.json(result);
    } catch (err) { 
        res.json(err);
    }
});


router.put('/:id', async (req, res) => {
    try {
        const [result] = await update(req.params.id, req.body);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const [result] = await deleteById(req.params.id);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
});


module.exports = router;