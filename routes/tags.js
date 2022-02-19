/* 
    PROFILES ROUTER
    '/profiles/' prefix
*/
const express = require('express');
const router = express.Router();

const controller = require('../controllers/Tag');


router.get('/', controller.getTags);
router.get('/:profile_id', controller.getProfileTags);
router.post('/', controller.createTag);
router.delete('/:profile_id/:title', controller.deleteTag);

module.exports = router;