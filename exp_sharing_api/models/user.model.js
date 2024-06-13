const getAll = () => {
    return db.query('select * from users');
}

const getAllbyGroup = (groupId) => {
    return db.query('select u.* from users u inner join group_members gm on gm.user_id = u.id where gm.group_id = ? and u.active = 1', [groupId]);
}

const getAllMemberbyGroup = (groupId) => {
    return db.query('select * from group_members where group_id = ?', [groupId]);
}


const getById = (userId) => {
    return db.query('select * from users where id = ? ',[userId]);
}

const getByMail = (userMail) => {
    return db.query('select * from users where mail = ? ',[userMail]);
}

const getFirstUsername = (username) => {
    return db.query('select * from users where username = ? limit 1',[username]);
}

const getByUsername = (username) => {
    return db.query('select * from users where username = ? ',[username]);
}

const getUsernamesList = (filter) => {
  const formattedFilter = `%${filter}%`;
  return db.query("SELECT username, id FROM users WHERE username LIKE ? and active = 1 LIMIT 10", [formattedFilter]);
};



const create = ({mail, username, password, firstname, lastname, phone, image}) => {
    return db.query('insert into users (mail, username, password, firstname, lastname, phone, image) values (?, ?, ?, ?, ?, ?, ?)',
    [mail, username, password, firstname, lastname, phone, image]);
}

const updateById = (userId, {mail, username, firstname, lastname, phone, image}) => {
    return db.query('update users set mail = ?, username = ?, firstname = ?, lastname = ?, phone = ?, image = ? where id = ?',
    [mail, username, firstname, lastname, phone, image, userId]);

}

const updatePassword = (userId, newPassword) => {
    return db.query(
      "update users set password = ? where id = ?",
      [newPassword, userId]
    );
}

const deleteById = (userId) => {
    return db.query('update users set active = 0 where id = ?', [userId]);
}

module.exports = {
    getAll, getAllbyGroup, getAllMemberbyGroup, getById, getByMail, getByUsername, getUsernamesList, create, updateById, updatePassword, deleteById, getFirstUsername
}