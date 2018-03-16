const db = require('../../db/schema.js');

module.exports = {
  fetchUserInfo: (req, res) => {
    // get user id from req.params
    //query userdatabase
    //search for ID
    // res.send(data);
  },
  addTeacherOrStudent: (req, res) => {
    //get user info from req.body
    //insert into users table
  },
  updateUserInfo: (req, res) => {
    //get user id and info from req.body
    //update user table
  }
};
