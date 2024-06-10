const router = require('express').Router();
const { getAllCategories, getCategoryById} = require('../../controllers/categories.controller');

//Obtener todas las caterogias
router.get('/', getAllCategories);

//Obtener la caterogia por id
router.get("/:id", getCategoryById);

module.exports = router;