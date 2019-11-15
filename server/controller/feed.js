const Pool = require('pg').Pool
  const pool = new Pool ({
    user: 'postgres',
    database: 'Daniel Db', 
    password: 'butanol409', 
    port: 4000, 
    max: 10, // max number of connection can be open to database
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  });

  exports.getFeed = (req, res) => {
   pool.query(SELECT * FROM )
  }