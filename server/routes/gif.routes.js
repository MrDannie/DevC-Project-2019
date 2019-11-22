const express = require('express');
const gifCommentControl = require('../controller/gifComment')
const gifControl = require('../controller/gif');
const auth = require('../middleware/auth');


const router = express.Router();


router.post('/v1/gifs', auth.verifyToken, gifControl.uploadImage);
router.delete('/v1/gifs/:gifId', auth.verifyToken, gifControl.deleteImage);
router.get('/v1/gifs/:gifId', auth.verifyToken, gifControl.getSingleImage);
router.get('/v1/gifs', auth.verifyToken, gifControl.getAllImage);
router.post('/v1/gifs/:gifId/comment', auth.verifyToken, gifCommentControl.postGifComment)

module.exports = router;