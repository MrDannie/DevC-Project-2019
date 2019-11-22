const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Helper = {

 //compare password method
 comparePassword(password, databasepassword) {
  bcrypt.compare(password, databasepassword, (err, res) => {
    if(res) {
     return true
    } else {
     return false
    } 
  });
 },
 
 //validate email method
 isValidEmail(email) {
   return /\S+@\S+\.\S+/.test(email);
 },
  
 
 //Generate Token
  
 generateToken(id) {
   const token = jwt.sign(
     {userId: id}, 
     'RANDOM_TOKEN_SECRET',
    { expiresIn: 20000000000000000000000 });
   return token;
 },
 
}

module.exports =  Helper;