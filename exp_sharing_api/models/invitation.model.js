// Get all the existing (active, pending) invitations
const getAll = () => {
    return db.query("SELECT * FROM invitations WHERE active = 1 AND accepted = 0");
}

const getById = (invitationId) => {
    return db.query("SELECT * FROM invitations WHERE id = ?", [invitationId]);
}

const getByUser = (userId) => {
    return db.query("SELECT * FROM invitations WHERE user_id = ? AND (active = 1 OR accepted = 1)", [userId]);
}

// Active and pending invitations for validation:
const getByGroupAndUser = (groupId, userId) => {
    return db.query("SELECT * FROM invitations WHERE group_id = ? AND user_id = ? AND active = 1 AND accepted = 0", [groupId, userId]);
}


const insert = ({ group_id, user_id, message }) => {
    return db.query(
        "INSERT INTO invitations (group_id, user_id, message) VALUES (?, ?, ?)", [group_id, user_id, message]
    );
}

// User accepts or rejects invitation:
const updateStatus = (invitationId, accepted) => {
    return db.query("UPDATE invitations SET accepted = ? WHERE id = ?", [accepted, invitationId]);
}

// Delete invitation (deactivate invitation):
const deleteById = (invitationId) => {
    return db.query("UPDATE invitations SET active = 0 WHERE id = ?", [invitationId]);

}

module.exports = {
    getAll, getById, getByUser, getByGroupAndUser, insert, updateStatus, deleteById
}