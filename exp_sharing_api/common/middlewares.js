const Jwt = require("jsonwebtoken");
const Group = require("../models/group.model");

const checkToken = (req, res, next) => {
  if (!req.headers["authorization"])
    res.status(403).json({ error: "Invalid API key" });

  const token = req.headers["authorization"];

  let payload;
  try {
    payload = Jwt.verify(token, process.env.PRIVATE_KEY);
  } catch (error) {
    return res.json({ error: error });
  }

  req.user = payload;

  next();
};

/* Valida si el usuario pertenece al grupo, tanto grupo como id vienen como parámetros en la petición */
const checkBelongsToGroup = async (req, res, next) => {
  const [result] = await Group.userBelongsToGroup(
    req.params.groupId,
    req.user.id
  );

  if (result.length === 0) {
    return res.status(401).json({ error: "El usuario no pertenece al grupo" });
  }

  next();
};

/* Valida si es admin del grupo, cuando se hace un post o un put de gasto (viene en el body el grupo) */
const checkIsAdmin = async (req, res, next) => {
  const [result] = await Group.userIsAdmin(req.body.group_id, req.user.id);

  if (result.length === 0) {
    return res.status(401).json({ error: "El usuario no es admin del grupo" });
  }

  next();
};

/* Valida si el usuario es admin, pero sólo tenemos id_gasto (delete) */
const checkIsAdminIdExpense = async (req, res, next) => {
  const [result] = await Group.userIsAdminIdExpense(req.params.id, req.user.id);

  if (result.length === 0) {
    return res.status(401).json({ error: "El usuario no es admin del grupo" });
  }

  next();
};

module.exports = {
  checkToken,
  checkBelongsToGroup,
  checkIsAdmin,
  checkIsAdminIdExpense,
};
