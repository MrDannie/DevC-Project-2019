const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');


app.use(fileupload({
 useTempFiles : true,
 tempFileDir : '/tmp/'
}));

app.use((req, res, next) => {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
 res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
 next();
})




const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;



app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const articleRoute = require('./routes/article.routes');
const gifRoute = require('./routes/gif.routes');
const userRoute = require('./routes/user.routes');
const feedRoute = require('./routes/feed.routes');


 
app.use('/api', userRoute);
app.use('/api', articleRoute);
app.use('/api', gifRoute);
app.use('/api', feedRoute);





app.listen(PORT, () => {
 console.log(`server listening on port ${PORT}....`);
});
