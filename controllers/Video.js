const Video = require('../models/Video');
const Profile = require('../models/Profile');
const sequelize = require('../services/db');

exports.getVideos = async function (req, res) {
    try {
        const videos = await Video.findAll();
        res.send(videos);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching all videos');
    }
}

exports.getVideoById = async function (req, res) {
    const {id} = req.params;
    try {
        const results = await Video.findAll({
            raw: true,  // only returns data values
            where: {
                id: id
            },
            include: [{
                model: Profile,
                required: true,  // inner join less costly than outer
            }],
        });

        let video = results[0];        
        res.send(video);

    } catch (err) {
        console.log(err);
        res.status(500).send(`Error fetching video ${id}`);
    }
}

exports.getUserVideos = async function (req, res) {
    const {profile_id} = req.params;
    console.log("fetching videos from user", profile_id)

    try {
        const videos = await Video.findAll({
            raw:true,
            include: [{
                model: Profile,
                require: true,
                where: {
                    id: profile_id,
                }
            }]
        })

        res.send(videos);

    } catch (err) {
        console.log(err);
        res.status(500).send(`Error fetching videos from ${profile_id}`);
    }
}
 
// Create a new video
exports.createVideo = async function (req, res) {
    console.log('creating video:', req.body);
    try {
        await Video.create(req.body);
        res.send("Video Created");
    } catch (err) {
        console.log(err);
        res.status(500).send(`Error creating video ${JSON.stringify(req.body)}`);
    }
}
 
// Update video by id
exports.updateVideo = async function (req, res) {
    const {id} = req.params;
    console.log("to update", id);

    try {
        await Video.update(req.body, {
            where: {
                id: id
            }
        });
        res.status(200).send("Video Updated");

    } catch (err) {
        console.log(err);
        res.status(500).send(
            'Error updating video: ' + JSON.stringify(req.body)
        );
    }
}
 
// Delete video by id
exports.deleteVideo = async function (req, res) {
    const {id} = req.params.id;
    try {
        await Video.destroy({
            where: {
                id: id
            }
        });
        res.send("Video Deleted");
    } catch (err) {
        console.log(err);
        res.status(500).status(500).send(`Error deleting video`);
    }
}

// route /api/videos/from/:profile_id
exports.getUserVideosAPI = async function (req, res) {
    // Raw Query
    const {profile_id} = req.params;
    console.log("fetching videos from user", profile_id);

    let queryString = `SELECT * FROM videos WHERE profile_id='${profile_id}'`
    const videos = await sequelize.query(queryString, {
        model: Video,
        mapToModel: true
    });

    console.log('Api fetched videos');
    console.log(videos);
    res.send(videos);
}
