const Members = require('../models/members.model');

// ------------------------------------------------------------------------------------------
// ----------- OPERACIONES POR GRUPO  -------------------------------------------------------
// ------------------------------------------------------------------------------------------

//Obtener todos los miembros de un grupo
const getAllMembersByGroup = async(req, res, next) => {
    try {
        const [result] = await Members.getAllOfGroup(req.params.groupId);
        if (!result[0]) {
            return res.status(404).json({error:"Group does not exist or has no members"});
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
};



// ------------------------------------------------------------------------------------------
// ----------- CRUD DE MIEMBROS ---------------------------------------------------------------
// ------------------------------------------------------------------------------------------

// Get member by GroupId by UserId
const getMember = async(req, res, next) => {
    try {
        const [result] = await Members.get(req.params.group_id, req.params.userid);
        if (!result[0]) {
            return res.status(404).json({error:"Selected Id does not exist"});
        }
        res.json(result[0]);
    } catch (error) {
        next(error);
    }
};

// Creacion nuevo gasto
const createMember = async (req, res, next) => {
    try {
        const [result] = await Members.create(req.body);
        res.json(result);
    } catch (err) { 
        next(err);
    }
};

// edicion por id
const updateMember = async (req, res, next) => {
    try {
        const [result] = await Members.update(req.params.group_id, req.params.userid, req.body);
        if (result.changedRows === 0) {
            return res.status(400).json({error:"Error on update, check the data or the id's"});
        } 
        res.json(result);
    } catch (err) {
        next(err);
    }
};

// delete por id
const deleteMember = async (req, res, next) => {
    try {
        const [result] = await Members.deleteByIds(req.params.group_id, req.params.userid);

        if (result.affectedRows === 1) {
            res.json({ message: 'Se ha borrado el miembro' });
        } else {
            res.status(404).json({ message: 'El miembro no existe' });
        }

        res.json(result);
    } catch (err) {
        next(err);
    }
};



module.exports = {
    getMember,
    getAllMembersByGroup,
    createMember,
    updateMember,
    deleteMember
}