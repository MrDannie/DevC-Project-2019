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


exports.postGifComment = (req, res) =>{
 if (!req.body.comment){
   return res.status(400).json({
   status: 'error',
   error: 'Comment has to be provided'
   })
 }
 const {gifId} = req.params
 const {comment} = req.body
 const createdOn = moment(new Date());
 const queryString = "INSERT INTO gifcomment (gif_id, comment, createdtime) VALUES ($1, $2, $3) returning *"
 
 pool.query('SELECT * FROM giftable WHERE id = $1', [gifId], (error, results)=>{
   if(!results.rows[0]){
     return res.status(400).json({
       status: 'error',
       error: 'This Gif is not found'
     });
   }
   pool.query(queryString, [gifId, comment, createdOn], (error, result) =>{
     if (error){
       return res.status(400).json({
         status: 'error',
         error: 'Comment has to be provided'
         })
     }
     return res.status(200).json({
       
         status : "success",
         data :   {
         message: "comment successfully created",
         createdOn,
         gifTitle: results.rows[0].title,
         comment: result.rows[0].comment
     
         }
         
     })
   })
 })

 
}