const getAll = () => {
    return db.query('SELECT  *   FROM expenses');
}

// Buscar todos los gastos de un grupo ordenados por fecha
const getAllOfGroup = (groupId) => {
    return db.query('SELECT  *   FROM expenses WHERE group_id = ? ORDER BY date asc', [groupId]);
}

// Buscar todos los gastos de un grupo ordenados por fecha y que esten activos
const getAllOfGroupActives = (groupId) => {
    return db.query('SELECT  *   FROM expenses WHERE group_id = ? and active = 1 ORDER BY date asc', [groupId]);
}

//Buscar todos los gastos de un grupo ordenados por fecha y que esten NO activos
const getAllOfGroupNoActives = (groupId) => {
    return db.query('SELECT  *   FROM expenses WHERE group_id = ? and active = 0 ORDER BY date asc', [groupId]);
}

//Buscar todos los gastos de un usuario en un grupo ordenados por fecha y que esten activos
const getAllOfUserofGroupActives = (groupId, userId) => {
    return db.query('SELECT  *   FROM expenses WHERE group_id = ? and active = 1 and payer_user_id = ? and active = 1 ORDER BY date asc', [groupId, userId]);
}

//Buscar todos los gastos de un usuario en un grupo ordenados por fecha y que esten nO activos
const getAllOfUserofGroupNoActives = (groupId, userId) => {
    return db.query('SELECT  *   FROM expenses WHERE group_id = ? and active = 1 and payer_user_id = ? and active = 0 ORDER BY date asc', [groupId, userId]);
}


const create = ({group_id, description, amount, date, payer_user_id, active}) => {
    return db.query('insert into expenses (group_id, description, amount, date, payer_user_id, active) values (?, ?, ?, ?, ?, ?)',[group_id, description, amount, date, payer_user_id, active]);
}

const update = (id, {group_id, description, amount, date, payer_user_id, active}) => {
    return db.query('update expenses set group_id = ?, description = ?, amount = ?, date = ?, payer_user_id = ?, active = ? where id = ?',
    [group_id, description, amount, date, payer_user_id, active, id]);
}

const deleteById = (id) => {
    return db.query('delete from expenses where id = ?', [id]);
}

const desactiveById = (id) => {
    return db.query('update expenses set active = 0 where id = ?', [id]);
}


module.exports = {
    getAll,
    getAllOfGroup,
    getAllOfGroupActives,
    getAllOfGroupNoActives,
    getAllOfUserofGroupActives,
    getAllOfUserofGroupNoActives,
    create,
    update,
    deleteById,
    desactiveById
}