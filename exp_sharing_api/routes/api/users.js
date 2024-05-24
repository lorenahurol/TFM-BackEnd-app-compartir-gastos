const router = require('express').Router();
const { getAll, getById, create, update, deleteById } = require('../../models/user.model');

router.get('/', async(req, res) => {
    try {
        const [result] = await getAll();
        res.json(result);
    } catch (error) {
        res.json(error);
}
});


router.get("/:userId", async (req, res) => {
  try {
    const [[result]] = await getById(req.params.userId);
    if (!result) return res.status (404).json({error:"Selected Id does not exist"})
    res.json(result);
  } catch (error) {
    res.json(error);
  }
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