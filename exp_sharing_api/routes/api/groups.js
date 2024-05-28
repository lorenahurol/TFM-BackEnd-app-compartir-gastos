const router = require('express').Router();

const Group = require("../../models/group.model");

// Peticiones que llegan a /api/groups:
// *** Anadir next cuando tengamos el middleware *** //
router.get("/", async (req, res) => {
    try {
        const [result] = await Group.getAll();
        res.json(result);
    } catch (error) {
        res.json(error);
    }
})

router.get("/:group_id", async (req, res) => {
    try {
        const [result] = await Group.getById(req.params.group_id);
            if (result.length === 0) {
            return res.json({
                error: "Grupo no encontrado"
                })
            }
        res.json(result[0]);
    } catch (error) {
        res.json(error);
    }
})


router.post("/", async (req, res) => {
// *** Anadir comprobacion: Grupo exists? *** //
    try {
        const [result] = await Group.insert(req.body);
        // Res: Datos del nuevo grupo:
        const [[newGroup]] = await Group.getById(result.insertId);
        res.json(newGroup);
    } catch (error) {
        res.json(error)
    }
}) 

router.update("/:group_id", async (req, res) => {
    try {
        const { name, description, category } = req.body;

        const [result] = await Group.updateById( name, description, category, req.params.group_id);
        if (result.affectedRows === 0) {
            return res.json({ error: "Error al actualizar el grupo" });
        }
        res.json({ message: "Grupo actualizado correctamente" });
    } catch (error) {
       res.json(error);
    }
})

router.delete("/:group_id", async (req, res) => {
    try {
        const [result] = await Group.deleteById(req.params.group_id);
        if (result.affectedRows === 0) {
                return res.json({ error: "Grupo no encontrado" });
        }
        res.json({ message: "El grupo se ha eliminado correctamente" });
    } catch (error) {
        res.json(error);
    }
})

module.exports = router;