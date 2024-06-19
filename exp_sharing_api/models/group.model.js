// Queries contra la tabla groups_app:

const getAll = () => {
  return db.query("SELECT * FROM groups_app");
};

const getById = (groupId) => {
  return db.query("SELECT * FROM groups_app WHERE id = ?", [groupId]);
};

const getByDescriptionCategoryUser = (description, category_id, userId) => {
  return db.query(
    "SELECT * FROM groups_app WHERE description = ? AND category_id = ? AND creator_user_id = ? AND active = 1",
    [description, category_id, userId]
  );
};

const insert = ({ description, category_id, creator_user_id }) => {
  return db.query(
    "INSERT INTO groups_app (description, category_id, creator_user_id) VALUES (?, ?, ?)",
    [description, category_id, creator_user_id]
  );
};

const updateById = (groupId, { description, category_id }) => {
  return db.query(
    "UPDATE groups_app SET description = ?, category_id = ? WHERE id = ?",
    [description, category_id, groupId]
  );
};

const deleteById = (groupId) => {
  return db.query("UPDATE groups_app SET active = 0 where id = ?", [groupId]);
};

// -- Queries de permisos: -- //

// Devuelve un registro si el usuario pertenece al grupo
const userBelongsToGroup = (groupId, userId) => {
  return db.query(
    "select * from group_members where group_id = ? and user_id = ?",
    [groupId, userId]
  );
};

const userIsAdmin = (groupId, userId) => {
  return db.query(
    "select * from groups_app where id = ? and creator_user_id = ? and active = 1",
    [groupId, userId]
  );
};

const userIsAdminIdInvitation = (invitationId, userId) => {
  return db.query(
    `select *
    from invitations as inv
    inner join groups_app as gro on gro.id = inv.group_id
    where inv.id = ?
    and gro.creator_user_id = ?
    and gro.active = 1`,
    [invitationId, userId]
  );
};

const userIsAdminIdExpense = (expenseId, userId) => {
  return db.query(
    `select * 
        from expenses exp 
        inner join groups_app gro on gro.id = exp.group_id
        where exp.id = ?
        and gro.creator_user_id = ? 
        and gro.active = 1`,
    [expenseId, userId]
  );
};

const getAllUserGroupsAsMember = (userId) => {
  return db.query("select group_id from group_members where user_id = ?", [
    userId,
  ]);
};

const getAllUserGroupsAsAdmin = (userId) => {
  return db.query("select id from groups_app where creator_user_id = ? AND active = 1", [
    userId,
  ]);
};

const getAllUserGroups = (userId) => {
  return db.query(
    "SELECT  group_id, groups_app.description, groups_app.category_id, groups_app.creator_user_id, groups_app.active    FROM expenses_sharing.group_members INNER JOIN groups_app on group_id = groups_app.id WHERE user_id = ? AND active = 1",
    [userId]
  );
};

const gellAllInfoGruopsUser = (userId) => {
  return db.query(
    `SELECT gm.group_id, ga.description, gc.description as category, CONCAT(u.firstname, ' ', u.lastname) creator_user
    FROM group_members gm 
    inner join groups_app ga on ga.id = gm.group_id
    inner join group_categories gc on gc.id = ga.category_id
    inner join users u on u.id = ga.creator_user_id
    where gm.user_id = ?
    and ga.active = 1`,
    [userId]
  );
};

const gellAllInfoGruopById = (groupId) => {
  return db.query(
    `SELECT ga.id as group_id, ga.description, gc.description as category, CONCAT(u.firstname, ' ', u.lastname) creator_user
    FROM groups_app ga
    inner join group_categories gc on gc.id = ga.category_id
    inner join users u on u.id = ga.creator_user_id
    where ga.id = ?`,
    [groupId]
  );
};

module.exports = {
  getAll,
  getById,
  getByDescriptionCategoryUser,
  insert,
  updateById,
  deleteById,
  userBelongsToGroup,
  userIsAdmin,
  userIsAdminIdInvitation,
  userIsAdminIdExpense,
  getAllUserGroupsAsMember,
  getAllUserGroupsAsAdmin,
  getAllUserGroups,
  gellAllInfoGruopsUser,
  gellAllInfoGruopById
};
