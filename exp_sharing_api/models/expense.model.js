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

//Buscar todos los gastos de un usuario en un grupo ordenados por fecha y que esten no activos
const getAllOfUserofGroupNoActives = (groupId, userId) => {
    return db.query('SELECT  *   FROM expenses WHERE group_id = ? and active = 1 and payer_user_id = ? and active = 0 ORDER BY date asc', [groupId, userId]);
}

// Buscar gasto por id
const getById = (id) => {
    return db.query('SELECT  *   FROM expenses WHERE id = ?', [id]);
}

//Crear nuevo gasto
const create = ({group_id, description, amount, date, payer_user_id, active}) => {
    return db.query('insert into expenses (group_id, description, amount, date, payer_user_id, active) values (?, ?, ?, ?, ?, ?)',[group_id, description, amount, date, payer_user_id, active]);
}

//Actualizar gasto por id
const update = (id, {group_id, description, amount, date, payer_user_id, active}) => {
    return db.query('update expenses set group_id = ?, description = ?, amount = ?, date = ?, payer_user_id = ?, active = ? where id = ?',
    [group_id, description, amount, date, payer_user_id, active, id]);
}

//Borrar gasto por id
const deleteById = (id) => {
    return db.query('delete from expenses where id = ?', [id]);
}

//Desactivar gasto por id
const desactiveById = (id) => {
    return db.query('update expenses set active = 0 where id = ?', [id]);
}

//Desactivar todos los gastos de un grupo
const deactivateByGroupId = (group_id) => {
    return db.query('update expenses set active = 0 where group_id = ?', [group_id]);
}


// Calcular el total de los gastos del grupo ordenador por usuario pagador
const getTotalExpensesOfGroupByUser = (group_id) => {

    return db.query('select payer_user_id, sum(amount) as total_expenses  from expenses where group_id = ? and active = 1 group by payer_user_id', [group_id]);
}


module.exports = {
    getAll,
    getAllOfGroup,
    getAllOfGroupActives,
    getAllOfGroupNoActives,
    getAllOfUserofGroupActives,
    getAllOfUserofGroupNoActives,
    getById,
    create,
    update,
    deleteById,
    desactiveById,
    deactivateByGroupId,
    getTotalExpensesOfGroupByUser
}