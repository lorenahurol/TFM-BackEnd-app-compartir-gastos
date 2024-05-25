const getAll = () => {
    return db.query('select * from users');
}

const getAllbyGroup = (groupId) => {
    return db.query('select u.* from users u inner join group_members gm on gm.user_id = u.id where gm.group_id = ? and u.active = 1', [groupId]);
}

const getById = (userId) => {
    return db.query('select * from users where id = ? ',[userId]);
}


const create = ({mail, username, password, firstname, lastname, phone, image}) => {
    return db.query('insert into users (mail, username, password, firstname, lastname, phone, image) values (?, ?, ?, ?, ?, ?, ?)',
    [mail, username, password, firstname, lastname, phone, image]);
}

const update = (userId, {mail, username, password, firstname, lastname, phone, image}) => {
    return db.query('update users set mail = ?, username = ?, password = ?, firstname = ?, lastname = ?, phone = ?, image = ? where id = ?',
    [mail, username, password, firstname, lastname, phone, image, userId]);

}

const deleteById = (userId) => {
    return db.query('update users set active = 0 where id = ?', [userId]);
}

module.exports = {
    getAll, getAllbyGroup, getById, create, update, deleteById
}