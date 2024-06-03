// Queries contra la tabla groups_app:

const getAll = () => {
    return db.query('SELECT * FROM groups_app');
}

const getById = (groupId) => {
    return db.query("SELECT * FROM groups_app WHERE id = ?", [groupId]);
}


const getByDesCatUser = (description, category_id, userId) => {
    return db.query("SELECT * FROM groups_app WHERE description = ? AND category_id = ? AND creator_user_id = ?", [description, category_id, userId]);
};

const insert = ({ description, category_id, creator_user_id }) => {
    return db.query("INSERT INTO groups_app (description, category_id, creator_user_id) VALUES (?, ?, ?)", [description, category_id, creator_user_id]);
}

const updateById = (groupId, { description, category_id }) => {
    return db.query("UPDATE groups_app SET description = ?, category_id = ? WHERE id = ?", [description, category_id, groupId]);
};

const deleteById = (groupId) => {
    return db.query("UPDATE groups_app SET active = 0 where id = ?", [groupId]);
}

module.exports = { getAll, getById, getByDesCatUser, insert, updateById, deleteById }