const Messages = require('../models/messages.model');

const getAllMsgsByGroup = async(req, res, next) => {
    try {
        const [result] = await Messages.getAllOfGroup(req.params.groupId);

        res.json(result);
    } catch (error) {
        next(error);
    }
};


//Obtener todos los mensajes por grupo y por usuario
const getAllMsgsByGroupAndUser = async(req, res, next) => {
    try {
        const [result] = await Messages.getAllOfUserofGroup(req.params.groupId, req.params.userId);
        
        res.json(result);
    } catch (error) {
        next(error);
    }
};


// Obtener, crear, editar y borrar mensaje individual -----------------------------------------

const getMsgByID = async (req, res, next) => {
    try {
        const [[result]] = await Messages.getById(req.params.id);
        if (!result) {
            return res.status (404).json({error:"Selected Id does not exist"});
        }
        res.json(result);
    } catch (error) {
      next(error);
    }
  };


// Creacion nuevo mensaje
const createMsg = async (req, res, next) => {
    try {
        const [result] = await Messages.create(req.body);
        // si ha ido bien, devolvemos el mensaje insertado:
        if (result.affectedRows) {
            const [[messageCreated]] = await Messages.getById(result.insertId);
            if (!messageCreated) {
                return res.status(404).json({error: "No se ha podido recuperar el mensaje tras insertar en BD"});
            }
            res.json(messageCreated);
        } else {
            res.json({error: "No se ha podido insertar el mensaje"});
        }
    } catch (err) { 
        next(err);
    }
};

// edicion por id
const updateMsg = async (req, res, next) => {
    try {
        const [result] = await Messages.update(req.params.id, req.body);
        res.json(result);
    } catch (err) {
        next(err);
    }
};

// delete por id
const deleteMsg = async (req, res, next) => {
    try {
        const [result] = await Messages.deleteById(req.params.id);

        if (result.affectedRows === 1) {
            res.json({ message: 'Se ha borrado el mensaje' });
        } else {
            res.status(404).json({ message: 'El paciente no existe' });
        }

    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllMsgsByGroup, 
    getAllMsgsByGroupAndUser, 
    getMsgByID, 
    createMsg, 
    updateMsg, 
    deleteMsg
};