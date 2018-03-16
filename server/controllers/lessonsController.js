const db = require('../../db/schema.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  saveLesson: (req, res) => {
    //insert into lessons table
    //where teacher_id & student id is obtained from req.body
  },
  fetchAllLessons: async (req, res) => {
    try {
      let id = req.params.id; //contingent upon passing
      let data = await db.Lesson.findAll({
        where: {
          [Op.or]: [
            {
              student_id: id
            },
            {
              teacher_id: id
            }
          ]
        }
      });
      res.send(data);
    } catch (error) {
      console.log(error);
      return;
    }
    //query lessons table
    //get username somehow
    //search for results where user_id = teacher/student id
    //save results in data
    //res.send(data) to front end
  },
  fetchFeaturedLessons: (req, res) => {
    //possible MVP+
  },
  fetchAllTeachersForLesson: async (req, res) => {
    try {
      let lesson = req.params.craft;
      let data = await db.User.findAll({
        where: {
          crafts: lesson
        }
      });
      res.send(data);
    } catch (error) {
      console.log(error);
      return;
    }
  }
  //query users table
  //res.send all users where type = teacher and language/craft/lesson matches req.params
  //get lesson/language/craft from req.params
};
