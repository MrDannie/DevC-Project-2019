const express = require('express');
const feedControl = require('../controller/feed')
const auth = require('../middleware/auth');


const router = express.Router();


router.get('/v1/feed', auth.verifyToken, feedControl.getFeeds);


module.exports = router;