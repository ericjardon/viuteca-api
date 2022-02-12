const Profile = require('../models/Profile');

 
exports.getProfiles = async function (req, res) {
    try {
        const profiles = await Profile.findAll();
        res.send(profiles);
    } catch (err) {
        console.log(err);
        res.status(500).json('Error fetching all profiles');
    }
}



exports.getProfileById = async function (req, res) {
    try {
        const profile = await Profile.findAll({
            where: {
                id: req.params.id
            }
        });
        res.send(profile[0]);
    } catch (err) {
        console.log(err);
    }
}
 
// Create a new profile
exports.createProfile = async function (req, res) {
    try {
        await Profile.create(req.body);
        res.json({
            "message": "Profile Created"
        });
    } catch (err) {
        console.log(err);
    }
}
 
// Update profile by id
exports.updateProfile = async function (req, res) {
    try {
        await Profile.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Profile Updated"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(
            'Error updating profile: ' + JSON.stringify(req.body)
        )
    }
}
 
// Delete profile by id
exports.deleteProfile = async function (req, res) {
    try {
        await Profile.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Profile Deleted"
        });
    } catch (err) {
        console.log(err);
    }
}