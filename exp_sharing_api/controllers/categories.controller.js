const Categories = require('../models/categories.model');

//Obtener todas las caterogias
const getAllCategories = async(req, res, next) => {
    try {
        const [result] = await Categories.getAll();
        res.json(result);
    } catch (error) {
        next(error);
    }
};

//Obtener la caterogia por id
const getCategoryById = async (req, res, next) => {
    try {
        const [[result]] = await Categories.getById(req.params.id);
        if (!result) {
            return res.status (404).json({error:"Selected Id does not exist"});
        }
        res.json(result);
    } catch (error) {
      next(error);
    }
};

module.exports = {
    getAllCategories, getCategoryById
}