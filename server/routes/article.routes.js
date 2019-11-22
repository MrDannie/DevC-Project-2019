const express = require('express');
const articleControl = require('../controller/article');
const articleCommentControl = require('../controller/articleComment')
const auth = require('../middleware/auth');

const router = express.Router();



router.post('/v1/articles', auth.verifyToken, articleControl.createArticle);
router.put('/v1/articles/:article_id', auth.verifyToken, articleControl.editArticle);
router.delete('/v1/articles/:article_id', auth.verifyToken, articleControl.deleteArticle);
router.get('/v1/articles/:article_id',  auth.verifyToken, articleControl.getSingleArticle);
router.post('/v1/articles/:article_id/comment', auth.verifyToken, articleCommentControl.postArticleComment);
router.get('/v1/articles',  auth.verifyToken, articleControl.getAllArticle);

module.exports = router;


