const getAll = () => {
    return db.query('select * from users');
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
    getAll, getById, create, update, deleteById
}