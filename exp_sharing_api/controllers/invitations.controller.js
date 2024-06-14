const Invitation = require("../models/invitation.model");

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
        res.json(result);
    } catch (error) {
        next(error);
    }
};

// Get by Group and User:
const getInvationByGroupAnduser = async (req, res, next) => {
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

// Handle invitation (By invited user):
const handleInvitation = async (req, res, next) => {
    try {
        const { invitationId, action } = req.params;
        const { user_id } = req.body;
        let accepted;

        if (action === "accept") {
            accepted = true;
        } else if (action === "reject") {
            accepted = false;
        } else {
            return res.json({ error: "Acción no válida " });
        }

        // Check if the invitation exists for user_id
        const [invitation] = await Invitation.getById(invitationId);

            if (invitation.length === 0 || invitation[0].user_id !== user_id) {
            return res.json({ error: "Invitación no encontrada" });
        }
        
        // Update invitation status:
        const [updateResult] = await Invitation.updateStatus(invitationId, accepted);

        const statusMessage = accepted ? "Invitación aceptada" : "Invitación rechazada";

        res.json({ statusMessage, updateResult });


    } catch (error) {
        console.error(error); // Imprimir el error
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
    getInvationByGroupAnduser,
    createInvitation,
    handleInvitation,
    deleteInvitationById
}