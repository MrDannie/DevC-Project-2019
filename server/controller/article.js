const db = require('../queries');
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


exports.createArticle = (req, res) => {
 const {title, article} = req.body;
  pool.query('INSERT INTO articles (owner_id, title, article, createdtime) VALUES ($1, $2, $3, $4)', [req.user.id, title, article, moment(new Date())], (error, results) =>{

   if(error){
    res.status(400).json({
     error: error
    })
   }
   res.status(201).json({
    message: "Article created successfully!!"
   })
  })
}



exports.editArticle = (req, res) => {
  const id = req.params.article_id
  const { title, article } = req.body;

  pool.query("UPDATE articles SET title = $1, article = $2 WHERE id = $3 AND owner_id = $4 returning *", [title, article, id, req.user.id], (error, results) =>{
    if(results.rows[0]){
     res.status(400).json({
      error: error
     })
    }
    res.json({
     message: "Article Updated successfully !!"
    })
   })
}

exports.deleteArticle = (req, res) => {
  const id = req.params.article_id
    pool.query('DELETE FROM articles WHERE id = $1 AND owner_id = $2 returning *', [id, req.user.id], (error, results) => {
      if(!results.rows[0]){
        res.status(400).json({
          message: "Article is not Found"
        })
      }
      res.status(200).json({
        message: "article deleted successfully!!"
      })
    })
}

exports.postArticleComment = (req, res) => {
  if (!req.body.comment){
    return res.status(400).json({message: "comment has to be provided"});
  }
 const articleId = req.params.article_id;
 const {comment} = req.body;

 const sqlString = 'INSERT INTO articlecomment (article_id, comment, createdTime) VALUES ($1, $2, $3)'
 pool.query(sqlString, [articleId, comment, moment(new Date())], (error, results)=> {
   if(error){
     return res.status(401).json({
       message: 'Unable to post comment'
     })
   }else{
     return res.status(201).json({
       status:"success",
       data: {
         message: "comment successfully created",
   
       }
     })
   }
 })
}

exports.getArticle = (req, res) => {
 const articleId = req.params.article_id;

  pool.query('SELECT * FROM articles WHERE id = $1', [articleId], (error, results) => {
    if (error){
      return res.status(400).json({message: "article could not be retrieved"})
    }
      return res.status(200).json(results.rows);
     })
}