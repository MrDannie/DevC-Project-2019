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
  pool.query('INSERT INTO articles (owner_id, title, article, createdtime) VALUES ($1, $2, $3, $4) returning *', [req.user.id, title, article, moment(new Date())], (error, results) =>{

   if(error){
    return res.status(400).json({
     status: error,
     error: "Article could not be created"
    })
   }
  return res.status(201).json({
    
      status : "success",
      data : {
      message :  "Aritcle Succesfully Created",
      articleId :  results.rows[0].id,
      createdOn :  results.rows[0].createdtime,
      title :  results.rows[0].title,
      }
      
   })
  })
}



exports.editArticle = (req, res) => {
  const id = req.params.article_id;
  const { title, article } = req.body;

  pool.query("UPDATE articles SET title = $1, article = $2 WHERE id = $3 AND owner_id = $4 returning *", [title, article, id, req.user.id], (error, results) =>{
    if(!results.rows[0]){
    return res.status(400).json({
      error: error
     })
    }
   return res.status(201).json({
      
        status : "success",
        data : {
        message :  "Article Successfully created",
        title :  results.rows[0].title,
        article :  results.rows[0].article,
        }
        
    })
   })
}

exports.deleteArticle = (req, res) => {
  const articleId = req.params.article_id
  pool.query('SELECT * FROM articles WHERE id = $1', [articleId], (error, result) =>{
    if(result.rows[0].owner_id !== req.user.id){
      return res.status(403).json({
         status: "error",
         error: "You are cannot delete this article"
      })
    }
  })
    pool.query('DELETE FROM articles WHERE id = $1 AND owner_id = $2 returning *', [articleId, req.user.id], (error, results) => {
      if(!results.rows[0]){
       return res.status(404).json({
          message: "Article is not Found"
        })
      }
      return res.status(202).json({
        status : "success",
        data :   {
        message: "Article deleted sucessfully"
        }
      })  
    })
}



exports.getSingleArticle = (req, res) => {
 const articleId = req.params.article_id;

 

  pool.query('SELECT * FROM articles WHERE id = $1', [articleId], (error, results) => {
    if (!results.rows[0]){
      return res.status(400).json({
        status: "errror",
        error: "This article DO NOT Exist"
      })
    }
      return res.status(200).json(results.rows);
     })
}

exports.getAllArticle = (req, res) => {
  pool.query('SELECT * FROM articles ORDER BY createdtime DESC', (error, results) =>{
    if(error){
      return res.status(400).json({
        status: "error",
        error: "Could Not retrieve article"
      })
    }
    return res.status(200).json({
      status: 'Success',
      data: results.rows
    });
  })
}