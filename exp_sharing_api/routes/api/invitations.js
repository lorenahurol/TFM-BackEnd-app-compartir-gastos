const router = require('express').Router();
const {getAllInvitations, getInvitationById, getInvationByGroupAnduser, createInvitation,
    acceptInvitation, rejectInvitation, deleteInvitationById } = require('../../controllers/invitations.controller');
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

// Accept an invitation (By invited user): URL: /api/invitation/invitationId/accept
router.put("/:invitationId/accept", acceptInvitation);

// Reject an invitation (By invited user): URL: /api/invitation/invitationId/reject
router.put("/:invitationId/reject", rejectInvitation);

// Delete an invitation (By Group Admin):
router.delete("/:invitationId", checkIsAdminIdInvitation, deleteInvitationById);

module.exports = router;