// Buscar todos los pagos de un grupo ordenados
const getAllOfGroup = (groupId) => {
    return db.query('SELECT  *   FROM payments WHERE group_id = ? ORDER BY date asc', [groupId]);
}

// Buscar gasto por id
const getById = (id) => {
    return db.query('SELECT  *   FROM payments WHERE id = ?', [id]);
}

//Crear nuevo gasto
const create = ({groups_id, users_id, amount}) => {
    return db.query('insert into payments (groups_id, users_id, amount) values (?, ?, ?)',[groups_id, users_id, amount]);
}

//Actualizar gasto por id
const update = (id, {groups_id, users_id, amount}) => {
    return db.query('update expenses set groups_id = ?, users_id = ?, amount = ? where id = ?',
    [groups_id, users_id, amount, id]);
}

//Borrar gasto por id
const deleteById = (id) => {
    return db.query('delete from payments where id = ?', [id]);
}



module.exports = {getAllOfGroup, getById, create, update, deleteById}
    