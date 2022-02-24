const {Op} = require('sequelize');
const Profile = require('../models/Profile');
const Tag = require('../models/Tag');
const {getProfileAndTags} = require('./Tag');
 
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
            raw: true,  // only returns data values
            where: {
                id: id
            }
        });

        // FIXME: optimize to a single sequelize query. (possible remodeling needed);
        const tags = await Tag.findAll({
            attributes: ['title'],
            raw: true,
            where: {
                profile_id: id,
            }
        });

        let profile_and_tags = profile[0];
        if (tags) {
            profile_and_tags.tags = tags.map(t => t.title);
        }
        
        res.send(profile_and_tags);
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
    const {id} = req.params;
    console.log("to update", id);

    try {
        await Profile.update(req.body, {
            where: {
                id: id
            }
        });
        res.status(200).send("Profile Updated");

    } catch (err) {
        console.log(err);
        res.status(500).send(
            'Error updating profile: ' + JSON.stringify(req.body)
        );
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
        res.status(500).status(500).send(`Error deleting profile`);
    }
}


exports.getProfileAndTags = getProfileAndTags;
