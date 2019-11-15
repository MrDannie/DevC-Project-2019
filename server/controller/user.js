// const db = require('../queries');
const helper = require('../middleware/auth');
const uuidv4 = require('uuid/v4');

const Pool = require('pg').Pool
  const pool = new Pool ({
    user: 'postgres',
    database: 'Daniel Db', 
    password: 'butanol409', 
    port: 4000, 
    max: 10, // max number of connection can be open to database
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  });

                          
//endpoint to get all Users//
exports.getUsers = (request, response) => {
 pool.query('SELECT * FROM users', (error, results) =>{
  if (error){
   res.json(error)
  }
  response.status(200).json(results.rows)
 })
}

//endpoint to create account//
 exports.createAccount = (req, res) => {
 if (!req.body.email || !req.body.password){
   return res.status(400).json({ message: "Some required value are missing"})
 }
 if (!helper.isValidEmail(req.body.email)){
   return res.status(400).json({message: "enter a valid email address"})
 }

 const hashedPassword = helper.hashPassword(req.body.password);
 
 const queryString = `INSERT INTO users (id, first_name,
                      last_name, email, pass_word, gender,
                     job_role, department, address) VALUES
                    ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *`;

const {
   firstName, lastName,
   email, gender,
   jobRole, department,
   address
   } = req.body
  
  
 const values = [uuidv4(), firstName, lastName, email, hashedPassword , gender, jobRole, department, address];

  pool.query(queryString, values, (error, results)=>{
    
    if(error){
     console.log('i love u');
     res.status(400).send(error);
    }else{
     
      const token = helper.generateToken(results.rows[0].id);
      return res.status(201).send({token: token});
    }
   }
  
  )
 }

 //endpoint to SignIn//

 exports.signIn = (req, res) => {
  const {email} = req.body;
  const queryString = "SELECT * FROM users WHERE email = $1";
  pool.query(queryString, [email], (error, results) => {
    console.log(error || results.rows[0])
   if (!results.rows[0]){
    return res.status(400).json({message: "incorrect email address"});
   }
   const dbpassword = results.pass_word;

   if(!helper.comparePassword(dbpassword, req.body.password)){

    return res.status(400).json({message: "invalid password"})

   } else {

    const token = helper.generateToken(results.rows[0].id);
    return res.status(201).send({token: token});

   }

   
  })
    
}

 