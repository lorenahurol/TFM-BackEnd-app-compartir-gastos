const router = require('express').Router();

const { checkToken } = require('../common/middlewares');

const apiLogin = require('./api/login');
const apiRegister = require('./api/register');
const apiUsersRouter = require('./api/users');
const apiGroupsRouter = require('./api/groups');
const apiExpensesRouter = require('./api/expenses');
const apiInvitationsRouter = require('./api/invitations');
const apiPaymentsRouter = require('./api/payments');
const apiMailingRouter = require('./api/mails');
const apiMessagesgRouter = require('./api/messages');
const apiCategoriesgRouter = require('./api/categories');

router.use('/login', apiLogin);
router.use('/register', apiRegister);
router.use("/users", checkToken, apiUsersRouter);
router.use("/groups", checkToken, apiGroupsRouter);
router.use("/expenses", checkToken, apiExpensesRouter);
router.use("/invitations", checkToken, apiInvitationsRouter);
router.use("/payments", checkToken, apiPaymentsRouter);
router.use("/mails", checkToken, apiMailingRouter);
router.use("/messages", checkToken, apiMessagesgRouter);
router.use("/categories", checkToken, apiCategoriesgRouter);


module.exports = router;