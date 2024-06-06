const router = require('express').Router();
const dayjs = require('dayjs');
const Messages = require('../../models/messages.model');

// Operaciones por grupo --------------------------------------------------------------------

//Obtener todos los mensajes de un grupo
router.get('/bygroup/:groupId', async(req, res) => {
    try {
        const [result] = await Messages.getAllOfGroup(req.params.groupId);
        if (!result[0]) 
        {
                return res.status (404).json({error:"Selected Id does not exist"});
        }
        res.json(result);
    } catch (error) {
        res.json(error);
    }
});


//Obtener todos los mensajes por grupo y por usuario
router.get('/bygroup/byuser/:groupId/:userId', async(req, res) => {
    try {
        const [result] = await Messages.getAllOfUserofGroup(req.params.groupId, req.params.userId);
        console.log(result);
        if (!result[0]) 
        {
                return res.status (404).json({error:"Any selected Ids do not exist"});
        }
        res.json(result);
    } catch (error) {
        res.json(error);
    }
});


// Obtener, crear, editar y borrar mensaje individual -----------------------------------------

router.get("/:id", async (req, res) => {
    try {
        const [[result]] = await Messages.getById(req.params.id);
        if (!result) 
        {
            return res.status (404).json({error:"Selected Id does not exist"});
        }
        res.json(result);
    } catch (error) {
      res.json(error);
    }
  });


// Creacion nuevo mensaje
router.post('/', async (req, res) => {
    try {
        const [result] = await Messages.create(req.body);
        res.json(result);
    } catch (err) { 
        res.json(err);
    }
});

// edicion por id
router.put('/:id', async (req, res) => {
    try {
        const [result] = await Messages.update(req.params.id, req.body);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
});

// delete por id
router.delete('/:id', async (req, res) => {
    try {
        const [result] = await Messages.deleteById(req.params.id);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
});


module.exports = router;
