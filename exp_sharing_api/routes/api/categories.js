const router = require('express').Router();
const Categories = require('../../models/categories.model');

//Obtener todas las caterogias
router.get('/', async(req, res) => {
    try {
        const [result] = await Categories.getAll();
        if (!result[0]) 
        {
            return res.status (404).json({error:"No data"});
        }
        res.json(result);
    } catch (error) {
        res.json(error);
    }
});

//Obtener la caterogia por id
router.get("/:id", async (req, res) => {
    try {
        const [[result]] = await Categories.getById(req.params.id);
        if (!result) 
        {
            return res.status (404).json({error:"Selected Id does not exist"});
        }
        res.json(result);
    } catch (error) {
      res.json(error);
    }
  });


module.exports = router;