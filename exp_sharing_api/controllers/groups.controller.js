const Group = require("../models/group.model");

/* Obtiene un objeto con dos arrays: grupos de admin y grupos como miembro (
    el usuario lo obtiene del token a través del middelware checktoken */
const getRoles = async (req, res) => {
    try {
        let roles = { admingroups: [], membergroups: [] };
        const [result] = await Group.getAllUserGroupsAsAdmin(req.user.id);
        if (result[0]) {
        const arrAdminGroups = result.map((obj) => obj.id);
        roles.admingroups = arrAdminGroups;
        }
    
        const [result2] = await Group.getAllUserGroupsAsMember(req.user.id);
        if (result2[0]) {
        roles.membergroups = result2.map((obj) => obj.group_id);
        }
    
        res.json(roles);
    } catch (error) {
        res.json(error);
    }
};
    
/*Para obtener la información de un grupo a la que pertenece un ususario*/
const getAllInfoGroupByUser = async (req, res) => {
    try {
        console.log("pasa por getall")
        const [result] = await Group.gellAllInfoGruopsUser(req.user.id);
        console.log(result);
        res.json(result);
    
    } catch (error) {
        console.log(error);
        res.json(error);
    }
};
    
// Obtener todos los grupos existentes (activos e inactivos):
const getAllGroups = async (req, res, next) => {
    try {
        const [result] = await Group.getAll();
        res.json(result);
    } catch (error) {
        next(error);
    }
};
    
    
const getGroupById = async (req, res, next) => {
    try {
        const [result] = await Group.getById(req.params.group_id);
        if (result.length === 0) {
        return res.status(404).json({ error: "Grupo no encontrado" });
        }
        res.json(result[0]);
    } catch (error) {
        next(error);
    }
};
    
//Obtener todos los grupos en los que se encuentra un usuario
const getAllGroupsByUser = async (req, res, next) => {
    try {
        const [result] = await Group.getAllUserGroups (req.params.user_id);
        if (result.length === 0) {
        return res.status(404).json({ error: "Grupo no encontrado" });
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
};
    
// Create Group:
const createGroup = async (req, res, next) => {
    try {
        const { description, category_id } = req.body;
        const userId = req.user.id;
    
        // Check all the fields are filled in:
        if (!description || !category_id) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }
    
        // Check if the group already exists for the logged user:
        const [[groupExists]] = await Group.getByDescriptionCategoryUser(
        description,
        category_id,
        userId
        );
        if (groupExists) {
        return res
            .status(409)
            .json({ error: "El grupo ya existe" });
        }
    
        const groupData = { description, category_id, creator_user_id: userId };
    
        const [result] = await Group.insert(groupData);
        // Res: New group data
        const [[newGroup]] = await Group.getById(result.insertId);
        res.json(newGroup);
    } catch (error) {
        next(error);
    }
};
    
const updateGroup = async (req, res, next) => {
    try {
        const { description, category_id } = req.body;
        const groupId = req.params.group_id;
    
        const [result] = await Group.updateById(groupId, {
        description,
        category_id,
        });
        if (result.affectedRows === 0) {
        return res.json({ error: "Error al actualizar el grupo" });
        }
        res.json({ message: "Grupo actualizado" });
    } catch (error) {
        next(error);
    }
};
    
const deleteGroupById = async (req, res, next) => {
    try {
        const [result] = await Group.deleteById(req.params.group_id);
        if (result.affectedRows === 0) {
        return res.json({ error: "Grupo no encontrado" });
        }
        res.json({ message: "Group eliminado correctamente" });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getRoles,
    getAllInfoGroupByUser,
    getAllGroups,
    getGroupById,
    getAllGroupsByUser,
    createGroup,
    updateGroup,
    deleteGroupById
};