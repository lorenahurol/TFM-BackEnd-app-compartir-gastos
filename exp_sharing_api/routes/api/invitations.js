const router = require('express').Router();

const Invitation = require("../../models/invitation.model");

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
})



module.exports = router;