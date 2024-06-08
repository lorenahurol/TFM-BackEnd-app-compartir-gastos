const getAll = () => {
    return db.query('SELECT  *   FROM group_categories');
}

// Buscar gasto por id
const getById = (id) => {
    return db.query('SELECT  *   FROM group_categories WHERE id = ?', [id]);
}


module.exports = {
    getAll,
    getById,
}