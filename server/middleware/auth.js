const jwt = require('jsonwebtoken');
const Pool = require('pg').Pool
  const pool = new Pool ({
    user: 'postgres',
    database: 'Daniel Db', 
    password: 'butanol409', 
    port: 4000, 
    max: 10, // max number of connection can be open to database
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  });


const Auth = {
  
   
  async verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if(!token) {
      return res.status(400).send({ 'message': 'Token is not provided' });
    }
    try {
      const decoded = await jwt.verify(token, 'RANDOM_TOKEN_SECRET');
      const text = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await pool.query(text, [decoded.userId]);
      if(!rows[0]) {
        return res.status(400).send({ 'message': 'The token you provided is invalid' });
      }
      req.user = { id: decoded.userId };
      next();
    } catch(error) {
      return res.status(400).send(error);
    }
  }
}

module.exports = Auth;








// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
// try {
//  const token = req.headers.authorizaton.split(' ')[1];
//  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
//  const userId = decodedToken.usedId;
//  if (req.body.userId && req.body.userId !== userId){
//    throw 'Invalid user ID';
 
//  } else {
//   next();
//  }
// } catch {
//    return res.status(401).json({
//     error: new Error ('Invaid request!')
//    })
//  }
// }
