const router = require('express').Router();
const { getAllMsgsByGroup, getAllMsgsByGroupAndUser, getMsgByID, createMsg, 
    updateMsg, deleteMsg } = require('../../controllers/messages.controller');

// Operaciones por grupo --------------------------------------------------------------------

//Obtener todos los mensajes de un grupo
router.get('/bygroup/:groupId', getAllMsgsByGroup);

//Obtener todos los mensajes por grupo y por usuario
router.get('/bygroup/byuser/:groupId/:userId', getAllMsgsByGroupAndUser);

// CRUD mensajes --------------------------------------------------------------------------
router.get("/:id", getMsgByID);
router.post('/', createMsg);
router.put('/:id', updateMsg);
router.delete('/:id', deleteMsg);


module.exports = router;
