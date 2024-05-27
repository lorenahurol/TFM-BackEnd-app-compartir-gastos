const router = require('express').Router();

const { checkToken } = require('../common/middlewares');

const apiLogin = require('./api/login');
const apiRegister = require('./api/register');
const apiUsersRouter = require('./api/users');
const apiGroupsRouter = require('./api/groups');
const apiExpensesRouter = require('./api/expenses');
const apiInvitationsRouter = require('./api/invitations');

router.use('/login', apiLogin);
router.use('/register', apiRegister);
router.use("/users", checkToken, apiUsersRouter);
router.use("/groups", checkToken, apiGroupsRouter);
router.use("/expenses", checkToken, apiExpensesRouter);
router.use("/invitations", checkToken, apiInvitationsRouter);

module.exports = router;