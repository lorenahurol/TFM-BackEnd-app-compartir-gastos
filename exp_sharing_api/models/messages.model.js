const getAll = () => {
    return db.query('SELECT  *   FROM messages');
}

// Buscar todos los mensajes de un grupo ordenados por fecha
const getAllOfGroup = (groupId) => {
    return db.query('SELECT  *   FROM messages WHERE group_id = ? ORDER BY timestamp asc', [groupId]);
}


//Buscar todos los mensajes de un usuario en un grupo ordenados por fecha
const getAllOfUserofGroup = (groupId, userId) => {
    return db.query('SELECT  *   FROM messages WHERE group_id = ? and user_id = ? ORDER BY timestamp asc', [groupId, userId]);
}


// Buscar mensaje por id
const getById = (id) => {
    return db.query('SELECT  *   FROM messages WHERE id = ?', [id]);
}

//Crear nuevo mensaje
const create = ({group_id, user_id, message}) => {
    return db.query('insert into messages (group_id, user_id, message) values (?, ?, ?)',[group_id, user_id, message]);
}

//Actualizar gasto por id
const update = (id, {group_id, user_id, message}) => {
    return db.query('update messages set group_id = ?, user_id = ?, message = ? where id = ?',
    [group_id, user_id, message, id]);
}

//Borrar gasto por id
const deleteById = (id) => {
    return db.query('delete from messages where id = ?', [id]);
}


module.exports = {
    getAll,
    getAllOfGroup,
    getAllOfUserofGroup,
    getById,
    create,
    update,
    deleteById
}