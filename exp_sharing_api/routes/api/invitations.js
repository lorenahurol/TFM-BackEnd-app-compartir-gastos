const router = require('express').Router();

const Invitation = require("../../models/invitation.model");
const User = require("../../models/user.model");

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

// Create an invitation (By Group Admin):
router.post("/create", async (req, res, next) => {
    try {
        const { group_id, user_id } = req.body;

        const newInvitation = new Invitation({
            group_id,
            user_id,
            accepted: 0,
            active: 1
        })

        const [result] = await newInvitation.insert();
        res.json(result);
    } catch (error) {
        next(error);
    }
})

// Accept an invitation (By invited user): URL: /api/invitation/invitationId/accept
router.put("/:invitationId/accept", async (req, res, next) => {
    try {
        const { invitationId } = req.params;
        const [result] = await Invitation.updateStatus(invitationId, 1); // 1 === accepted
            if (result.affectedRows === 0) {
                return res.json({ error: "Pending invitation not found" });
            }
        res.json({ message: "Invitation accepted" });

    } catch (error) {
        next(error);
    }
})

// Reject an invitation (By invited user): URL: /api/invitation/invitationId/reject
router.put("/:invitationId/reject", async (req, res, next) => {
    try {
        const { invitationId } = req.params;
        const [result] = await Invitation.updateStatus(invitationId, 0); // 0 === rejected
            if (result.affectedRows === 0) {
                return res.json({ error: "Pending invitation not found" });
            }
        res.json({ message: "Invitation rejected" });

    } catch (error) {
        next(error);
    }
})

// Cancel an invitation (By Group Admin):
router.delete("/:invitationId", async (req, res, next) => {
    try {
        const { invitationId } = req.params;
        const [result] = await Invitation.deleteById(invitationId);
            if (result.affectedRows === 0) {
                return res.json({ error: "Invitation not found" });
        }
        res.json({ message: "Invitation deleted successfully" })
    } catch (error) {
        next(error);
    }
})


module.exports = router;