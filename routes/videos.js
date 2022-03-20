/* 
    PROFILES ROUTER
    '/videos/' prefix
*/
const express = require('express');
const router = express.Router();

const controller = require('../controllers/Video');


router.get('/', controller.getVideos);
router.get('/from/:profile_id', controller.getUserVideos);  // includes the user's information
router.get('/:id', controller.getVideoById);
router.post('/', controller.createVideo);
router.put('/:id', controller.updateVideo);
router.delete('/:id', controller.deleteVideo);

// router.get('/tags*', controller.getProfilesWithTags); // tags in JSON array

module.exports = router;