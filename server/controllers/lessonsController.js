const db = require('../../db/schema.js');

module.exports = {
  saveLesson: (req, res) => {
    //insert into lessons table
    //where teacher_id & student id is obtained from req.body
  },
  fetchAllLessons: (req, res) => {
    //query lessons table
    //get username somehow
    //search for results where user_id = teacher/student id
    //save results in data
    //res.send(data) to front end
  },
  fetchFeaturedLessons: (req, res) => {
    //possible MVP+
  },
  fetchAllTeachersForLesson: (req, res) => {
    //get lesson/language/craft from req.params
    //query users table
    //res.send all users where type = teacher and language/craft/lesson matches req.params
  }
};
