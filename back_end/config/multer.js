const multer = require(`multer`);
const path = require(`path`);

const armazenar = multer.diskStorage({ destination: `uploads/`, filename: (req, file, cb) => {

    const url = `${Date.now()}-${file.originalname}`;
    cb(null, url);
}});

const upload = multer({ armazenar });
module.exports = upload;