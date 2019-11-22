const cloudinary = require('cloudinary').v2;
const moment = require('moment');
require('dotenv').config()

const Pool = require('pg').Pool
  const pool = new Pool ({
    user: 'postgres',
    database: 'Daniel Db', 
    password: 'butanol409', 
    port: 4000, 
    max: 10, // max number of connection can be open to database
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  });


cloudinary.config({
 cloud_name: 'dnf2mjxnt',
 api_key: '332754854471585',
 api_secret: 'oqVdEZweNhgHURprgRVSPGLoUNg'
});

exports.uploadImage = (req, res) => {
 const file = req.files.image;

 if(file.mimetype !== 'image/gif'){
  return res.status(415).json({
   message: "Image must be of GIF format"
  })
 }

 cloudinary.uploader.upload(file.tempFilePath, (error, result) => {
   if(error){
     return res.status(404).json({error: "Unable to connect"})
   }

  const queryString = 'INSERT INTO giftable (owner_id, title, gifurl, createdtime, publicId) VALUES ($1, $2, $3, $4, $5) returning *'
  const ownerId = req.user.id;
  const {title} = req.body.title;
  const gifUrl = result['url'];
  const publicId = result.public_id
  const createdTime = moment(new Date());

  pool.query(queryString, [ownerId, title, gifUrl, createdTime, publicId], (error, result) =>{
   if(error){
    return res.status(400).json({
       status: "error",
       error: "Image could not be uploaded"
    
    })
   }
   return res.status(201).json({
    
     status : "success",
     data : {
     gifId :  result.id,
     message :  "GIF image successfully posted",
     createdOn :  result.rows[0].createdtime,
     title :  result.rows[0].title,
     imageUrl :  result.rows[0].gifurl,
     } 
   })
  })
 })
}

exports.deleteImage = (req, res) => {
 const {gifId} = req.params;
 pool.query('SELECT * FROM giftable WHERE id = $1', [gifId], async (error, result) => {
  if(!result.rows[0]){
   return res.status(400).json({
    status: "error",
    error: "this GIF is not found"
   })
  }
  if(result.rows[0].owner_id !== req.user.id){
   return res.status(400).json({
    status: 'error',
    message: 'You cannot delete this Gif'
   })
  }

   cloudinary.uploader.destroy(result.rows[0].publicid);

  pool.query('DELETE FROM gifTable WHERE id = $1', [gifId], (error, result) =>{
   if(error){
    return res.status(400).json({
     status: 'error',
     message: 'You cannot delete this Gif'
    })
   }
   return res.status(200).json({
    status: 'success',
      data: {
        message: 'Gif post successfully deleted',
      }
   })
  })
 })

}

exports.getSingleImage = (req, res) =>{
 const {gifId} = req.params

 pool.query('SELECT * FROM giftable WHERE id = $1', [gifId], (error, result) =>{
  if (!result.rows[0]){
   return res.status(400).json({
    status: 'error',
    message: 'This GiF is not found'
   })
  }
  return res.status(200).json({
   status: 'success',
   data: result.rows[0]
 }) 
 })
}

exports.getAllImage = (req, res) =>{
 pool.query('SELECT * FROM giftable ORDER BY createdtime DESC', (error, result)=>{
  if (error){
   return res.status(400).json({
    status: 'error',
    message: 'Unable to retrieve images'
   })
  }
  res.status(200).json({
   status: 'Success',
   data: result.rows
 });
 })
}

