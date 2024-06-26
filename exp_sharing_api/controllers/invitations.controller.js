const Invitation = require("../models/invitation.model");
const Member = require("../models/members.model");

// Get all existing (active) invitations:
const getAllInvitations = async (req, res, next) => {
    try {
        const [result] = await Invitation.getAll();
        res.json(result);
    } catch (error) {
        next(error);
    }
};

// Get by Id:
const getInvitationById = async (req, res, next) => {
    try {
        const { invitationId } = req.params;
        const [result] = await Invitation.getById(invitationId);

        if (result.length === 0) {
            return res.status(404).json({ error: 'Invitación no encontrada' });
        }

        res.json(result);
    } catch (error) {
        next(error);
    }
};

// Get by User:
const getInvitationsByUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const [result] = await Invitation.getByUser(userId);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

// Get by Group and User:
const getInvitationsByGroupAnduser = async (req, res, next) => {
  try {
    const { groupId, userId } = req.params;
    const [result] = await Invitation.getByGroupAndUser(groupId, userId);

    res.json(result);
  } catch (error) {
    next(error);
  }
};


// Create an invitation (By Group Admin):
const createInvitation = async (req, res, next) => {
    try {

        const { group_id, user_id, message } = req.body;

        // Check that the fields are filled in:
        if (!group_id || !user_id) {
            return res.json({ error: "Todos los campos son obligatorios" });
        }

        // Check if the invitation for the user already exists:
        const pendingInvitation = await Invitation.getByGroupAndUser(group_id, user_id);
        if (pendingInvitation[0].length > 0) {
            return res.json({ error: "La invitación ya existe" });
        }
        
        // Message field can be null:
        const invitationData = { group_id, user_id, message: message || null }
        
        const [result] = await Invitation.insert(invitationData);
        res.json(result);
    } catch (error) {
        next(error);
    } 
};


// Update invitation by Id
const updateInvitation = async (req, res, next) => {
    try {
        const [result] = await Invitation.updateById(req.body);
        let memberCreated = false;
        
        if (result.affectedRows === 0) {
            return res.json({ error: "Error al actualizar la invitación" });
        } else {
            let statusMessage = "";
            // if is accepted, create a new member
            if (req.body.accepted === 1) {
                statusMessage = "Invitación aceptada correctamente";
                const { group_id, user_id } = req.body;
                const [result2] = await Member.create({group_id, user_id, percent: 0, equitable: 1});
                if (result2.affectedRows === 1) {
                    memberCreated = true;
                }
            } else if (req.body.active === 0) {
                statusMessage = "Invitación rechazada correctamente";
            }
            res.json({ result, statusMessage, memberCreated });
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}


// Deactivate an invitation (By Group Admin):
const deleteInvitationById = async (req, res, next) => {
    try {
        const { invitationId } = req.params;

        const [result] = await Invitation.deleteById(invitationId);
        if (result.affectedRows === 0) {
            return res.json({ error: "Invitación no encontrada" });
        }
        res.json({ message: "Invitación eliminada correctamente" })
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllInvitations,
    getInvitationById,
    getInvitationsByUser,
    getInvitationsByGroupAnduser,
    createInvitation,
    updateInvitation,
    deleteInvitationById
}