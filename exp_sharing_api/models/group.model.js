// Queries contra la tabla groups_app:

const getAll = () => {
    return db.query('SELECT * FROM group_app');
}