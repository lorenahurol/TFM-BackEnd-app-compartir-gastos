// Buscar todos los pagos de un grupo ordenados
const getAllOfGroup = (groupId) => {
    return db.query('SELECT  *   FROM payments WHERE group_id = ?', [groupId]);
}



module.exports = {getAllOfGroup}
    