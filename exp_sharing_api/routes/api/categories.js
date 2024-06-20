/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - id
 *         - description
 *       properties:
 *         id:
 *           type: int
 *           description: The auto-generated id of the book
 *         description:
 *           type: string
 *           description: The description of the category
 *       example:
 *         id: 1
 *         description: Viaje
 */

const router = require('express').Router();
const { getAllCategories, getCategoryById} = require('../../controllers/categories.controller');




//Obtener todas las caterogias

/**
* @swagger
* tags:
*   name: Category
*   description: The Category managing API
* /api/categories/:
*   get:
*     summary: Lists all the categories
*     tags: [Category]
*     responses:
*       200:
*         description: The list of the categories
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Category'
*/
router.get('/', getAllCategories);

//Obtener la caterogia por id

/**
* @swagger
* /api/categories/{id}:
*   get:
*     summary: Get a category by Id
*     tags: [Category]
*     parameters:
*       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The category id
*     responses:
*       200:
*         description: Get a category by Id
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Category'
*/
router.get("/:id", getCategoryById);

module.exports = router;