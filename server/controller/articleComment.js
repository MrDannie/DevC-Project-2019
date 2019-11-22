const moment = require('moment');

const Pool = require('pg').Pool
  const pool = new Pool ({
    user: 'postgres',
    database: 'Daniel Db', 
    password: 'butanol409', 
    port: 4000, 
    max: 10, // max number of connection can be open to database
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  });

exports.postArticleComment = (req, res) => {
 if (!req.body.comment){
   return res.status(400).json({message: "comment has to be provided"});
 }
const articleId = req.params.article_id;
const {comment} = req.body;
const createdOn = moment(new Date())

const sqlString = 'INSERT INTO articlecomment (article_id, comment, createdTime) VALUES ($1, $2, $3)'
pool.query(sqlString, [articleId, comment, createdOn ], (error, results)=> {
  if(error){
    return res.status(401).json({
      message: 'Unable to post comment'
    })
  }else{
    return res.status(201).json({
      status : "success",
      data :   {
      message: "Comment created successfully",
      createdOn: results.rows[0].createdtime,

}
    })
  }
})
}