const db = require('../../db/schema.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const axios = require('axios');

module.exports = {
  //TODO: think about incorporating inner joins here
  fetchMongoChatById: async (req, res) => {
    try {
      let { id } = req.params;
      let messages = await axios.get(`http://localhost:3001/chat/fetch/${id}`);
      res.send(messages.data.messages);
    } catch (error) {
      console.log('Error with findMongoChatId', error);
      return;
    }
  },

  saveLesson: async (req, res) => {
    try {
      let saved = await axios.post('http://localhost:3001/chat/save', req.body);
      let { teacher_id, student_id, notes } = saved.data.fakeBody;
      let id = saved.data.saved._id;
      let lesson = await db.Lesson.create({
        teacher_id: teacher_id,
        student_id: student_id,
        chat_id: id,
        notes: notes
      });
      res.send(lesson);
    } catch (error) {
      console.log('Error with saveLesson', error);
      return;
    }
  },

  fetchAllLessons: async (req, res) => {
    try {
      let { id } = req.params; //contingent upon passing
      let allLessons = await db.Lesson.findAll({
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
      res.send(allLessons);
    } catch (error) {
      console.log('Error with fetchAllLessons', error);
      return;
    }
  },

  //TODO: returns the FEATURED crafts, needs to
  fetchFeaturedCrafts: (req, res) => {
    //possible MVP+
  },

  fetchAllTeachersForCraft: async (req, res) => {
    try {
      let { craft } = req.params;
      let teachers = await db.User.findAll({
        where: {
          crafts: {
            [Op.contains]: [craft]
          },
          [Op.and]: [{ type: 2 }]
        }
      });
      res.send(teachers);
    } catch (error) {
      console.log(error);
      return;
    }
  }
};
