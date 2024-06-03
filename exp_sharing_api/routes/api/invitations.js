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

// Create an invitation:
router.post("/", async (req, res, next) => {
    try {
        const { email } = req.body;
        const groupId = req.groupId // Gestionar en front

        // Check that the fields are filled in:
        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }

        // Find the user_id through their email:
        const [user] = await User.getByMail(email);
        // Check they are registered:
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if the invitation exists:
        const [invitationExists] = await Invitation.getByGroupAndUser(groupId, user.id);
        if (invitationExists && (invitationExists.accepted || invitationExists.active)) {
            return res.status(409).json({ error: "The user has already been invited" });
        }

        // Create the invitation:
        const invitationData = {
            groupId,
            userId: user.id, // Usuario invitado
            accepted: 0,
            active: 1
        }

        const [result] = await Invitation.insert(invitationData);
        res.json(result);

    } catch (error) {
        next(error);
    }
})



module.exports = router;