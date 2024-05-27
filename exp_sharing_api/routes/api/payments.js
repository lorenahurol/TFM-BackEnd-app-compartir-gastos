const router = require('express').Router();
const { getAllOfGroup} = require('../../models/payments.model');

router.get('/bygroup/:groupId', (req, res) => {
    getAllOfGroup(req.params.groupId)
        .then((data) => {
            res.json(data[0]);
        })
        .catch((err) => {
            res.json(err);
        });
});

module.exports = router;