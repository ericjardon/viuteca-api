const express = require('express');
const router = express.Router();

/* '/api/' prefix */

const controller = require('../../controllers/Video');


// ----------- VIDEO --------------
router.get('/videos/from/:profile_id', controller.getUserVideosAPI);  // does not include the user's profile information


module.exports = router;
