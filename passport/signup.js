const LocalStrategy = require('passport-local').Strategy;
const db = require('../db/schema.js');
const bCrypt = require('bcrypt-nodejs');
const multer  = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const path = require('path');
const env = require('dotenv');
const ENV = path.resolve(__dirname, '../.env');
env.config({path: ENV});
console.log("signup passport path: ",ENV)

var s3 = new AWS.S3({
  accessKeyId: process.env.AMZNKeyId,
  secretAccessKey: process.env.AMZNAccKy,
  region: process.env.AMZNrgn
});


console.log("accessKeyId: ",process.env.AMZNKeyId)
console.log("secretAccessKey: ",process.env.AMZNAccKy)
console.log("region: ",process.env.AMZNrgn)

uploadFile = function (bucketName, file, cb) {
  s3.upload({
      Bucket: bucketName,
      Key: file.name,
      Body: file.data,
      ACL: 'public-read'
    },function (data) {
      console.log('Successfully uploaded package to AWS-S3');
      cb(data)
    });
}

module.exports = passport => {
  let createHash = password => {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  };
  passport.use(
    'signup',
    new LocalStrategy(
      {
        passReqToCallback: true
      },
      async (req, username, password, done) => {

        //console.log("full req to AUTH: ", req.body)
        let bucket = "craftme"
        console.log("bucket: ", bucket);


        const user = await db.User.findOne({ where: { username: username } });
        if (user) {
          return done(null, false, { message: 'user already exists' });
        } else {
          if (req.files){
            let active = req.files.profile_pic;
            uploadFile(bucket, active,(data) => {console.log("From AWS", data)
              const url = `https://${bucket}.s3.amazonaws.com/${active.name}`;
    
    
              console.log("file: ", active);
              console.log("url: ", url);
              console.log("username: ", req.body.username);
              console.log("password: ", req.body.password);
              console.log("bio: ", req.body.bio);
              console.log("type: ", req.body.type);
    
              db.User.create({
                username: username,
                password: createHash(password),
                type: req.body.type,
                bio: req.body.bio,
                profile_pic_url: url
              });
    
            })
           }
           else{
            console.log("NO PHOTO");
            console.log("username: ", req.body.username);
            console.log("password: ", req.body.password);
            console.log("bio: ", req.body.bio);
            console.log("type: ", req.body.type);
            const url = "";
            const active = null;
    
            db.User.create({
              username: username,
              password: createHash(password),
              type: req.body.type,
              bio: req.body.bio,
              profile_pic_url: url
            }); 
           }
           return done(null, { username: username });
        }
      }
    )
  );
};
