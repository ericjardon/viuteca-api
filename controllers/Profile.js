const Profile = require('../models/Profile');

 
exports.getProfiles = async function (req, res) {
    try {
        const profiles = await Profile.findAll();
        res.send(profiles);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching all profiles');
    }
}

exports.getProfileById = async function (req, res) {
    const {id} = req.params;
    try {
        const profile = await Profile.findAll({
            where: {
                id: id
            }
        });
        res.send(profile[0]);
    } catch (err) {
        console.log(err);
        res.status(500).send(`Error fetching profile ${id}`);
    }
}
 
// Create a new profile
exports.createProfile = async function (req, res) {
    console.log('creating profile:', req.body);
    try {
        await Profile.create(req.body);
        res.send("Profile Created");
    } catch (err) {
        console.log(err);
        res.status(500).send(`Error creating profile ${JSON.stringify(req.body)}`);
    }
}
 
// Update profile by id
exports.updateProfile = async function (req, res) {
    const {id} = req.params.id;
    try {
        await Profile.update(req.body, {
            where: {
                id: id
            }
        });
        res.send("Profile Updated");

    } catch (err) {
        console.log(err);
        res.status(500).send(
            'Error updating profile: ' + JSON.stringify(req.body)
        )
    }
}
 
// Delete profile by id
exports.deleteProfile = async function (req, res) {
    const {id} = req.params.id;
    try {
        await Profile.destroy({
            where: {
                id: id
            }
        });
        res.send("Profile Deleted");
    } catch (err) {
        console.log(err);
        res.status(500).send(`Error deleting profile`);
    }
}