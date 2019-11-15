const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Helper = {
 
 //method to hash password
 hashPassword(password) {
   return bcrypt.hash(password, 10)
 },

 //compare password method
 comparePassword(databasepassword, password) {
   return bcrypt.compare(password, databasepassword);
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
 }

 
}

module.exports =  Helper;