const Pool = require('pg').Pool
  const pool = new Pool ({
    user: 'postgres',
    database: 'Daniel Db', 
    password: 'butanol409', 
    port: 4000, 
    max: 10, // max number of connection can be open to database
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  });


exports.getFeeds = (req, res) => {
 pool.query('SELECT (title, article, createdtime) FROM articles  UNION SELECT (title, gifurl, createdtime) FROM giftable', (error, result) =>{
  if(error){
   console.log(error);
   return res.status(400).json({
    status: "error",
    error: "Feed Cannot be fetched"
   })
  }
  return res.status(200).json({
   status: "success",
   data: result.rows
  })
 })
}