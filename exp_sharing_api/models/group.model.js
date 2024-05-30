// Queries contra la tabla groups_app:

const getAll = () => {
    return db.query('SELECT * FROM groups_app');
}

const getById = (groupId) => {
    return db.query("SELECT * FROM groups_app WHERE id = ?", [groupId]);
}

/**
const getByName = (groupName) => {
    
} **/

const insert = ({ name, description, category }) => {
    return db.query("INSERT INTO groups_app (name, description, category) VALUES (?, ?, ?)", [name, description, category]);
}

const updateById = (groupId, { name, description, category }) => {
    return db.query("UPDATE groups_app SET name = ?, description = ?, category =? WHERE id = ?", [name, description, category, groupId]);
}

const deleteById = (groupId) => {
    return db.query("UPDATE groups_app SET active = 0 where id = ?", [groupId]);
}