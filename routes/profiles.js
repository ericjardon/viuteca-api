/* 
    PROFILES ROUTER
    '/profiles/' prefix
*/
const express = require('express');
const router = express.Router();

const controller = require('../controllers/Profile');


router.get('/', controller.getProfiles);
router.get('/:id', controller.getProfileById);
router.post('/new', controller.createProfile);
router.put('/:id', controller.updateProfile);
//router.delete('/:id', controller.deleteProfile);

module.exports = router;