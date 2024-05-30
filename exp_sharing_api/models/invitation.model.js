// Get all the existing (active) invitations
const getAll = () => {
    return db.query("SELECT * FROM invitations WHERE active = 1");
}

const getById = (invitationId) => {
    return db.query("SELECT * FROM invitations WHERE =? AND active = 1", [invitationId]);
}

/** Fecha se autogenera?? **/
/** Se debe anadir email y mensaje a BD? */
const insert = ({ groupId, userId, accepted, active }) => {
    return db.query("INSERT INTO invitations (group_id, user_id, accepted, active) VALUES (?, ?, ?, ?)", [groupId, userId, accepted, active]);
}

//** No es necesario actualizar? */

// Delete invitation (deactivate invitation):
const deactivateById = (invitationId) => {
    return db.query("UPDATE invitations SET active = 0 WHERE id = ?", [invitationId]);

}

module.exports = {
    getAll, getById, insert, deactivateById
}