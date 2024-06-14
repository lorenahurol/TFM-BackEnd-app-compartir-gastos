const getAll = () => {
    return db.query('SELECT  *   FROM group_members');
}

// Buscar todos los miembros de un grupo ordenados por fecha
const getAllOfGroup = (groupId) => {
    return db.query('SELECT  *   FROM group_members WHERE group_id = ?', [groupId]);
}

//Obtener miembro por groupId y userID
const get = (groupId, userId) => {
    return db.query('SELECT  *   FROM group_members WHERE group_id = ? and user_id = ?', [groupId, userId]);
}


//Crear nuevo miembro
const create = ({group_id, user_id, percent, equitable}) => {
    return db.query('insert into group_members (group_id, user_id, percent, equitable) values (?, ?, ?, ?)',[group_id, user_id, percent, equitable]);
}

//Actualizar miembro por id
const update = (groupid, userid, {group_id, user_id, percent, equitable}) => {
    return db.query('update group_members set group_id = ?, user_id = ?, percent = ?, equitable = ? where group_id = ? and user_id = ?',
    [group_id, user_id, percent, equitable, groupid, userid]);
}

//Borrar miembro por id
const deleteByIds = (groupid, userid) => {
    return db.query('delete from group_members where group_id = ? and user_id = ?', [groupid, userid]);
}


module.exports = {
    get,
    getAll,
    getAllOfGroup,
    create,
    update,
    deleteByIds
}