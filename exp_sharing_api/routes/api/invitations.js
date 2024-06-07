const router = require('express').Router();

const Invitation = require("../../models/invitation.model");
const { checkIsAdmin } = require("../../common/middlewares");

// Requests for /api/invitations:

// Get all existing (active) invitations:
router.get("/", async (req, res, next) => {
    try {
        const [result] = await Invitation.getAll();
        res.json(result);
    } catch (error) {
        next(error);
    }
})

// Get by Id:
router.get("/:invitationId", async (req, res, next) => {
    try {
        const { invitationId } = req.params;
        const [result] = await Invitation.getById(invitationId);
        res.json(result);
    } catch (error) {
        next(error);
    }
})

// Get by Group and User:
router.get("/bygroupanduser/:groupId/:userId", async (req, res, next) => {
  try {
      const { groupId, userId } = req.params;
      console.log(req.params);
    const [result] = await Invitation.getByGroupAndUser(groupId, userId);
    res.json(result);
  } catch (error) {
    next(error);
  }
})


// Create an invitation (By Group Admin):
router.post("/", checkIsAdmin, async (req, res, next) => {
    try {

        const { group_id, user_id, message } = req.body;

        // Check that the fields are filled in:
        if (!group_id || !user_id || !message) {
            return res.json({ error: "Todos los campos son obligatorios" });
        }

        // Check if the invitation for the user already exists:
        console.log(`group_id: ${group_id}, user_id: ${user_id}`);
        const pendingInvitation = await Invitation.getByGroupAndUser(group_id, user_id);
            if (pendingInvitation[0].length > 0) {
                return res.json({ error: "La invitación ya existe" });
            }
        
        const [result] = await Invitation.insert(req.body);
        res.json(result);
    } catch (error) {
        next(error);
    } 
})

// Accept an invitation (By invited user): URL: /api/invitation/invitationId/accept
router.put("/:invitationId/accept", async (req, res, next) => {
    try {
        const { invitationId } = req.params;
        const { user_id } = req.body;

        // Check if the invitation exists for user_id
        const [invitation] = await Invitation.getById(invitationId);

            if (invitation.length === 0 || invitation[0].user_id !== user_id) {
            return res.json({ error: "Invitación no encontrada" });
            }

        // Accept invitation:
        const [updateResult] = await Invitation.updateStatus(invitationId, 1); // 1 === accepted
        res.json({ message: "Invitación aceptada", updateResult });

    } catch (error) {
        console.error(error); // Imprimir el error
        next(error);
    }
})


// Reject an invitation (By invited user): URL: /api/invitation/invitationId/reject
router.put("/:invitationId/reject", async (req, res, next) => {
    try {
        const { invitationId } = req.params;
        const { user_id } = req.body;

        // Check if the invitation exists for user_id
        const [invitation] = await Invitation.getById(invitationId);

            if (invitation.length === 0 || invitation[0].user_id !== user_id) {
            return res.json({ error: "Invitación no encontrada" });
        }
        
        const [updateResult] = await Invitation.updateStatus(invitationId, 0); // 0 === rejected
        res.json({ message: "Invitation rechazada", updateResult });

    } catch (error) {
        next(error);
    }
})

// Deactivate an invitation (By Group Admin):
router.delete("/:invitationId", checkIsAdmin, async (req, res, next) => {
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
})


module.exports = router;