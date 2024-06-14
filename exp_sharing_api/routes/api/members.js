const router = require('express').Router();
const { getAllMembersByGroup, getMember, createMember, updateMember, deleteMember} = require('../../controllers/members.controller');
const { checkIsAdmin } = require('../../common/middlewares');

// Operaciones por grupo --------------------------------------------------------------------

router.get('/bygroup/:groupId', getAllMembersByGroup);



// CRUD de Miembros ----------------------------------------------------------------------------
router.get('/:group_id/:userid', getMember);
router.post('/', checkIsAdmin, createMember);
router.put('/:group_id/:userid', checkIsAdmin, updateMember);

//necesario meter validacion de admin
router.delete('/:group_id/:userid', checkIsAdmin, deleteMember);

module.exports = router;