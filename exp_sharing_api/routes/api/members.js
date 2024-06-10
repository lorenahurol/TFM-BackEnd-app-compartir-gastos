const router = require('express').Router();
const MembersController = require('../../controllers/members.controller');
const { checkBelongsToGroup, checkIsAdmin, checkIsAdminIdExpense } = require('../../common/middlewares');

// Operaciones por grupo --------------------------------------------------------------------

router.get('/bygroup/:groupId', MembersController.getAllMembersByGroup);



// CRUD de Miembros ----------------------------------------------------------------------------
router.post('/', checkIsAdmin, MembersController.createMember);
router.put('/:groupid/:userid', checkIsAdmin, MembersController.updateMember);


module.exports = router;