// Devuelve un registro si el usuario pertenece al grupo
const userBelongsToGroup = (groupId, userId) => {
    return db.query('select * from group_members where group_id = ? and user_id = ?', [groupId, userId]);
}

const userIsAdmin = (groupId, userId) => {
    console.log('groupId', groupId);
    console.log('userId', userId);
    return db.query('select * from groups_app where id = ? and creator_user_id = ?', [groupId, userId]);
}

const userIsAdminIdExpense = (expenseId, userId) => {
    return db.query(
        `select * 
        from expenses exp 
        inner join groups_app gro on gro.id = exp.group_id
        where exp.id = ?
        and gro.creator_user_id = ?`, [expenseId, userId]);
}

const getAllUserGroupsAsMember = (userId) => {
    return db.query('select group_id from group_members where user_id = ?', [userId]);
}

const getAllUserGroupsAsAdmin = (userId) => {
    return db.query('select id from groups_app where creator_user_id = ?', [userId]);
}


module.exports = { 
    userBelongsToGroup, 
    userIsAdmin, 
    userIsAdminIdExpense, 
    getAllUserGroupsAsMember, 
    getAllUserGroupsAsAdmin 
};

