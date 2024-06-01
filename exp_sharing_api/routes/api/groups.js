const router = require('express').Router();
const Group = require('../../models/group.model');

router.get('/roles/:userId', async(req, res) => {
    try {
        let roles = { admingroups: [], membergroups: []};
        const [result] = await Group.getAllUserGroupsAsAdmin(req.params.userId);
        if (result[0]) 
        {
            const arrAdminGroups = result.map(obj => obj.id);
            roles.admingroups = arrAdminGroups
        }

        const [result2] = await Group.getAllUserGroupsAsMember(req.params.userId);
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