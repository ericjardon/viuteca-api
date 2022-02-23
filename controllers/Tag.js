const Profile = require('../models/Profile');
const Tag = require('../models/Tag');
const sequelize = require('../services/db');


exports.getProfileTags = async function (req, res) {
    const {profile_id} = req.params;
    try {
        const tags = await Tag.findAll({
            attributes: ['title'],
            where: {
                profile_id: profile_id
            }
        });
        res.send(tags);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Error fetching tags for profile ' + req.params.profile_id)
    }
}

exports.getTags = async function (req, res) {
    try {
        const tags_counts = await Tag.findAll({
            attributes: [
                'title',
                [sequelize.fn('COUNT', sequelize.col('*')), 'count']
            ],
            group: 'title',
        });
        res.send(tags_counts);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Error fetching tag counts');
    }
}

 
// Create a new tag
exports.createTag = async function (req, res) {
    console.log('create tag:', req.body);
    try {
        await Tag.create(req.body);  // profile_id, title in lowercase
        res.send("Tag Created");
    } catch (err) {
        console.log(err);
        res.status(500).send('Error creating tag. Try again later.')
    }
}
 

// Delete tag
exports.deleteTag = async function (req, res) {
    const {profile_id, title} = req.params;

    try {
        await Tag.destroy({
            where: {
                profile_id: profile_id,
                title: title,
            }
        });
        res.send("Tag Deleted");
    } catch (err) {
        console.error(err);
        res.status(500).send(`Error deleting tag: "${title}"`)
    }
}


exports.getProfilesWithTag = async function (req, res) {
    const {title} = req.params;
    try {
        const results = await Tag.findAll({
            where: {
                title: title,
            },
            include: [{
                model: Profile,
                required: true,  // inner join less costly than outer
            }],
        })
        res.send(results || 'Sorry, no results at all');
    } catch (err) {
        console.error(err);
        res.status(500).send(`Error fetching profiles with tag: "${title}"`);
    }
}


// used by Profiles router
exports.getProfileAndTags = async function (req, res) {
    // Useful when we know a profile HAS tags.
    console.log('Get profile and tags!');
    const {profile_id} = req.params;
    try {
        const results = await Tag.findAll({
            where: {
                profile_id: profile_id,
            },
            include: [{
                model: Profile,
                required: true,  // inner join less costly than outer
            }],
        })

        let profile;
        if (results) {
            profile = results[0].profile;
            profile.tags = results.map(obj => obj.title);
        }
        
        console.log("results", results);
        res.send(results || 'Sorry, no results at all');
    } catch (err) {
        console.error(err);
        res.status(500).send(`Error fetching profile and tags: "${profile_id}"`);
    }
}