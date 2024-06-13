const Members = require('../models/members.model');
const dayjs = require('dayjs');

// ------------------------------------------------------------------------------------------
// ----------- OPERACIONES POR GRUPO  -------------------------------------------------------
// ------------------------------------------------------------------------------------------

//Obtener todos los miembros de un grupo
const getAllMembersByGroup = async(req, res) => {
    try {
        const [result] = await Members.getAllOfGroup(req.params.groupId);
        if (!result[0]) 
        {
            return res.status (404).json({error:"Selected Id does not exist"});
        }
        res.json(result);
    } catch (error) {
        res.json(error);
    }
};



// ------------------------------------------------------------------------------------------
// ----------- CRUD DE MIEMBROS ---------------------------------------------------------------
// ------------------------------------------------------------------------------------------


// Creacion nuevo gasto
const createMember = async (req, res) => {
    console.log("paso por aqui");
    try {
        const [result] = await Members.create(req.body);
        res.json(result);
    } catch (err) { 
        res.json(err);
    }
};

// edicion por id
const updateMember = async (req, res) => {
    try {
        const [result] = await Members.update(req.params.groupid, req.params.userid, req.body);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
};

// delete por id
const deleteMember = async (req, res) => {
    try {
        const [result] = await Members.deleteByIds(req.params.groupid, req.params.userid);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
};



module.exports = {
    getAllMembersByGroup,
    createMember,
    updateMember,
    deleteMember
}