const router = require('express').Router();
const { getAll, create, update, deleteById } = require('../../models/user.model');

router.get('/', (req, res) => {
    getAll()
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