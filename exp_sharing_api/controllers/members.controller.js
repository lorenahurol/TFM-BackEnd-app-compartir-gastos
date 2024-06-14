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

// Get member by GroupId by UserId
const getMember = async(req, res) => {
    try {
        const [result] = await Members.get(req.params.group_id, req.params.userid);
        if (!result[0]) 
        {
            return res.status (404).json({error:"Selected Id does not exist"});
        }
        res.json(result[0]);
    } catch (error) {
        res.json(error);
    }
};

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
        const [result] = await Members.update(req.params.group_id, req.params.userid, req.body);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
};

// delete por id
const deleteMember = async (req, res) => {
    try {
        const [result] = await Members.deleteByIds(req.params.group_id, req.params.userid);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
};



module.exports = {
    getMember,
    getAllMembersByGroup,
    createMember,
    updateMember,
    deleteMember
}