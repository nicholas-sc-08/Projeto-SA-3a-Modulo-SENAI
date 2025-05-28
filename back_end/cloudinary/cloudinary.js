
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'fly-cloud-name',
  api_key: '126286442867493',
  api_secret: 'U5rKEY5zWC0K2NwLKNGDDGiqF20',
});

module.exports = cloudinary;
