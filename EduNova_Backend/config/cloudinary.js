const cloudinary = require('cloudinary').v2;
require('dotenv').config();
exports.cloudinaryConnect = () => {
    try{
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.API_SECRET,
    });
    console.log("Cloudinary connected");
    }
    catch(error){  
        console.log("Cloudinary connection failed", error.message);
        throw error;
    }   
}