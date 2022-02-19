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
router.put('/:id', controller.updateTag);

//router.delete('/:id', controller.deleteTag);

module.exports = router;