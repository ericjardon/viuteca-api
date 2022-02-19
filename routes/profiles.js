/* 
    PROFILES ROUTER
    '/profiles/' prefix
*/
const express = require('express');
const router = express.Router();

const controller = require('../controllers/Profile');


router.get('/', controller.getProfiles);
router.get('/:id', controller.getProfileById);
router.post('/', controller.createProfile);
router.put('/:id', controller.updateProfile);

// router.get('/tags*', controller.getProfilesWithTags); // tags in JSON array
//router.delete('/:id', controller.deleteProfile);

module.exports = router;