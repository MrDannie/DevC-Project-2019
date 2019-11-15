const express = require('express');
const app = express();
var fileUpload = require('express-fileupload');

app.use(fileUpload());



var fs = require('fs');


var cloudinary = require('cloudinary').v2;


cloudinary.config({
 cloud_name: 'dnf2mjxnt',
 api_key: '332754854471585',
 api_secret: 'oqVdEZweNhgHURprgRVSPGLoUNg'
});


// CLOUDINARY_URL=cloudinary://549932546953477:aZ5xXpeuebNGjTA3RXmgJXXPxDs@dyhjr9bq1

exports.uploadImage = (req, res) =>{
 
 
 const image = req.files.image;
 cloudinary.uploader.upload(image , (error, results) => {
 if(error){
   console.log(error)
   return res.status(200).json({ message: "error! could not upload file"});
  } else {
   return res.status(200).send({results})
    }
   })
  }
