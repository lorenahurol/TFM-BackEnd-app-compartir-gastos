// Get all the existing (active, pending) invitations
const getAll = () => {
    return db.query("SELECT * FROM invitations WHERE active = 1 AND accepted = 0");
}

const getByUser = (userId) => {
    return db.query("SELECT * FROM invitations WHERE user_id = ? AND (active = 1 OR accepted = 1)", [userId]);
}

const getByGroupAndUser = (groupId, userId) => {
    return db.query("SELECT * FROM invitations WHERE group_id = ? AND user_id = ?", [groupId, userId]);
}

const insert = (invitationData) => {
    return db.query("INSERT INTO invitations (group_id, user_id, accepted, active) VALUES (?, ?, ?, ?)", [invitationData.groupId, invitationData.userId, invitationData.accepted, invitationData.active]);
}

// User accepts or rejects invitation:

// Delete invitation (deactivate invitation):
const deleteById = (invitationId) => {
    return db.query("UPDATE invitations SET active = 0 WHERE id = ?", [invitationId]);

}

module.exports = {
    getAll, getByUser, getByGroupAndUser, insert, deleteById
}