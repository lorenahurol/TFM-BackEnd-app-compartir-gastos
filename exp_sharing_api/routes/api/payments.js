const router = require('express').Router();
const { getAllPaymentsByGroup, getPaymentById, createPayment, updatePayment,
    deletePayment } = require('../../controllers/payments.controller');

//Obtener todos los pagos de un grupo
router.get('/bygroup/:groupId', getAllPaymentsByGroup);

// CRUD de payment
router.get('/:id', getPaymentById);
router.post('/', createPayment);
router.put('/:id', updatePayment);
router.delete('/:id', deletePayment);

module.exports = router;