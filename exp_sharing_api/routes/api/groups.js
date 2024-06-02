const router = require('express').Router();
const Group = require('../../models/group.model');

/* Obtiene un objeto con dos arrays: grupos de admin y grupos como miembro (
    el usuario lo obtiene del token a través del middelware checktoken */
router.get('/roles', async(req, res) => {
    try {
        let roles = { admingroups: [], membergroups: []};
        const [result] = await Group.getAllUserGroupsAsAdmin(req.user.id);
        if (result[0]) 
        {
            const arrAdminGroups = result.map(obj => obj.id);
            roles.admingroups = arrAdminGroups
        }

        const [result2] = await Group.getAllUserGroupsAsMember(req.user.id);
        if (result2[0]) 
        {
            roles.membergroups = result2.map(obj => obj.group_id);
        }

        res.json(roles);
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;