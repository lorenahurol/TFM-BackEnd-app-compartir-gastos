const Payments = require('../models/payments.model');

//Obtener todos los pagos de un grupo
const getAllPaymentsByGroup = async (req, res, next) => {
    try {
        const [result] = await Payments.getAllOfGroup(req.params.groupId);
        res.json(result);
    } catch (err) {
        next(err);
    }
};

//Obtener pago por id
const getPaymentById = async (req, res, next) => {
    try {
        const [result] = await Payments.getById(req.params.id);
        if (!result) {
            return res.status(404).json({error:"Selected Id does not exist"});
        }
    } catch (err) {
        next(err);
    }
};

// Creacion nuevo pago
const createPayment = async (req, res, next) => {
    try {
        const [result] = await Payments.create(req.body);
        if (result.affectedRows > 0) {
            return res.json({ success: true })
        } else{
            return res.json({ success: false, error: 'Payment not created'})
        };
    } catch (err) { 
        next(err);
    }
};

// edicion por id
const updatePayment = async (req, res, next) => {
    try {
        const [result] = await Payments.update(req.params.id, req.body);
        if (result.changedRows === 1) {
            res.json(result);
        } else {
            res.status(400).json({ error: 'Se ha producido un error al actualizar' });
        }
        res.json(result);
    } catch (err) {
        next(err);
    }
};

// delete por id
const deletePayment = async (req, res) => {
    try {
        const [result] = await Payments.deleteById(req.params.id);

        if (result.affectedRows === 1) {
            res.json({ message: 'Se ha eliminado el pago' });
        } else {
            res.status(404).json({ message: 'El pago no existe' });
        }
    } catch (err) {
        res.json(err);
    }
};

module.exports = {
    getAllPaymentsByGroup,
    getPaymentById,
    createPayment,
    updatePayment,
    deletePayment
};