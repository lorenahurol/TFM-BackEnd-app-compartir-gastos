const router = require('express').Router();
const {getAllInvitations, getInvitationById, getInvationByGroupAnduser, createInvitation, handleInvitation, deleteInvitationById } = require('../../controllers/invitations.controller');
const { checkIsAdmin, checkIsAdminIdInvitation } = require("../../common/middlewares");


// Requests for /api/invitations:

// Get all existing (active) invitations:
router.get("/", getAllInvitations);

// Get by Id:
router.get("/:invitationId", getInvitationById);

// Get by Group and User:
router.get("/bygroupanduser/:groupId/:userId", getInvationByGroupAnduser);

// Create an invitation (By Group Admin):
router.post("/", checkIsAdmin, createInvitation);

// Handle invitation (By invited user): Accept ot Reject
router.put("/:invitationId/:action(accept|reject)", handleInvitation);

// Delete an invitation (By Group Admin):
router.delete("/:invitationId", checkIsAdminIdInvitation, deleteInvitationById);

module.exports = router;