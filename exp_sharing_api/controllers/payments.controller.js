const Payments = require('../models/payments.model');

//Obtener todos los pagos de un grupo
const getAllPaymentsByGroup = (req, res) => {
    Payments.getAllOfGroup(req.params.groupId)
        .then((data) => {
            res.json(data[0]);
        })
        .catch((err) => {
            res.json(err);
        });
};

//Obtener pago por id
const getPaymentById = (req, res) => {
    Payments.getById (req.params.id)
        .then((data) => {
            res.json(data[0]);
        })
        .catch((err) => {
            res.json(err);
        });
};

// Creacion nuevo pago
const createPayment = async (req, res) => {
    try {
        const [result] = await Payments.create(req.body);
        res.json(result);
    } catch (err) { 
        res.json(err);
    }
};

// edicion por id
const updatePayment = async (req, res) => {
    try {
        const [result] = await Payments.update(req.params.id, req.body);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
};

// delete por id
const deletePayment = async (req, res) => {
    try {
        const [result] = await Payments.deleteById(req.params.id);
        res.json(result);
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