// Buscar todos los pagos de un grupo ordenados
const getAllOfGroup = (groupId) => {
    return db.query('SELECT  *   FROM payments WHERE group_id = ? ORDER BY date asc', [groupId]);
}

// Buscar pago por id
const getById = (id) => {
    return db.query('SELECT  *   FROM payments WHERE id = ?', [id]);
}

//Crear nuevo pago: recibe un array de creditos por usuario y grupo y realiza inserción múltiple de todos los pagos del array
const create = (payments) => {
    let query = 'INSERT INTO payments (groups_id, users_id, amount) VALUES ';
    let values = [];
    let placeholders = payments.map(payment => {
        values.push(payment.group_id, payment.user_id, payment.credit);
        return '(?, ?, ?)';
    }).join(', ');

    query += placeholders

    return db.query(query,values);
}

//Actualizar pago por id
const update = (id, {groups_id, users_id, amount}) => {
    return db.query('update expenses set groups_id = ?, users_id = ?, amount = ? where id = ?',
    [groups_id, users_id, amount, id]);
}

//Borrar pago por id
const deleteById = (id) => {
    return db.query('delete from payments where id = ?', [id]);
}



module.exports = {getAllOfGroup, getById, create, update, deleteById}
    