const router = require('express').Router();
const {getAllInvitations, getInvitationById, getInvitationsByUser, getInvitationsByGroupAnduser, createInvitation, updateInvitation, deleteInvitationById } = require('../../controllers/invitations.controller');
const { checkIsAdmin, checkIsAdminIdInvitation } = require("../../common/middlewares");


// Requests for /api/invitations:

// Get all existing (active) invitations:
router.get("/", getAllInvitations);

// Get by Id:
router.get("/:invitationId", getInvitationById);

// Get by User:
router.get("/byuser/:userId", getInvitationsByUser);

// Get by Group and User:
router.get("/bygroupanduser/:groupId/:userId", getInvitationsByGroupAnduser);

// Create an invitation (By Group Admin):
router.post("/", checkIsAdmin, createInvitation);

// Update invitation by Id.
router.put("/", updateInvitation);

// Delete an invitation (By Group Admin):
router.delete("/:invitationId", checkIsAdminIdInvitation, deleteInvitationById);

module.exports = router;