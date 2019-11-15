const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userControl = require('./controller/user');
const articleControl = require('./controller/article');
const fileController = require('./controller/gif');
var fileupload = require('express-fileupload');
const authorize = require('./middleware/authorize')

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;



app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(fileupload({
 useTempfiles: true
}));

 
app.get('/api/v1/users', authorize.verifyToken, userControl.getUsers)
app.post('/api/v1/auth/create-user',  userControl.createAccount)
app.post('/api/v1/articles', authorize.verifyToken, articleControl.createArticle)
app.put('/api/v1/articles/:article_id', authorize.verifyToken, articleControl.editArticle)
app.post('/api/v1/auth/signin', userControl.signIn)
app.delete('/api/v1/articles/:article_id', authorize.verifyToken, articleControl.deleteArticle)
app.post('/api/v1/articles/:article_id/comment', authorize.verifyToken, articleControl.postArticleComment)
app.post('/api/v1/gifs',  fileController.uploadImage)
app.get('/api/v1/articles/:article_id', authorize.verifyToken, articleControl.getArticle)





app.listen(PORT, () => {
 console.log(`server listening on port ${PORT}....`);
});
