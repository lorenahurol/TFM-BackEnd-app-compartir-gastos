const router = require('express').Router();

const Group = require("../../models/group.model");

// Peticiones que llegan a /api/groups:

router.get("/", async (req, res, next) => {
    try {
        const [result] = await Group.getAll();
        res.json(result);
    } catch (error) {
        next(error);
    }
})

router.get("/:group_id", async (req, res, next) => {
    try {
        const [result] = await Group.getById(req.params.group_id);
            if (result.length === 0) {
            return res.status (404).json({error:"Group not found"})
            }
        res.json(result[0]);
    } catch (error) {
        next(error);
    }
})


router.post("/", async (req, res, next) => {
    try {
        const { name, description, category } = req.body;

        // Check all the fields are filled in:
        if (!name || !description || !category) {
            throw new Error();
        }

        // Checks if the group already exists:
        const [groupExists] = await Group.getByName(name);
        if (groupExists) {
            return res.status(409).json({ error: "This group already exists" });
        }

        const [result] = await Group.insert(req.body);
        // Res: New group data
        const [[newGroup]] = await Group.getById(result.insertId);
        res.json(newGroup);
    } catch (error) {
        next(error)
    }
}) 

router.put("/:group_id", async (req, res, next) => {
    try {
        const { name, description, category } = req.body;

        const [result] = await Group.updateById( name, description, category, req.params.group_id);
        if (result.affectedRows === 0) {
            return res.json({ error: "Group could not be updated" });
        }
        res.json({ message: "Group succesfully updated" });
    } catch (error) {
       next(error);
    }
})

router.delete("/:group_id", async (req, res, next) => {
    try {
        const [result] = await Group.deleteById(req.params.group_id);
        if (result.affectedRows === 0) {
                return res.json({ error: "Group not found" });
        }
        res.json({ message: "Group succesfully deleted" });
    } catch (error) {
        next(error);
    }
})

module.exports = router;