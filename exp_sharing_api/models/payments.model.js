// Buscar todos los gastos de un grupo ordenados por fecha
const getAllOfGroup = (groupId) => {
    return db.query('SELECT  *   FROM payments WHERE group_id = ?', [groupId]);
}

module.exports = {getAllOfGroup}
    