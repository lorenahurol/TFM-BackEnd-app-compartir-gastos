const router = require('express').Router();

const apiUsersRouter = require('./api/users');
const apiGroupsRouter = require('./api/groups');
const apiExpensesRouter = require('./api/expenses');
const apiInvitationsRouter = require('./api/invitations');

router.use('/users', apiUsersRouter);
router.use('/groups', apiGroupsRouter);
router.use('/expenses', apiExpensesRouter);
router.use('/invitations', apiInvitationsRouter);

module.exports = router;