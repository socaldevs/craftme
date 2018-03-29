const db = require('../../db/schema.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const axios = require('axios');
const path = require('path');
const env = require('dotenv');
const ENV = path.resolve(__dirname, '../../.env');
env.config({path: ENV});

module.exports = {
  //TODO: think about incorporating inner joins here
  fetchMongoChatById: async (req, res) => {
    try {
      let { id } = req.params;
      let messages = await axios.get(`${process.env.SOCKET_PATH}/chat/fetch/${id}`);
      res.send(messages.data);
    } catch (error) {
      console.log('Error with findMongoChatId', error);
      return;
    }
  },

  saveLesson: async (req, res) => {
    try {
      let { teacher_id, student_id, notes, messages } = req.body;
      let saved = await axios.post(`${process.env.SOCKET_PATH}/chat/save`, messages);
      let id = saved.data._id;
      let lesson = await db.Lesson.create({
        teacher_id,
        student_id,
        chat_id: id,
        notes,
        title
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

};
