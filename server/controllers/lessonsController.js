const db = require('../../db/schema.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const axios = require('axios');
const path = require('path');
const { removeBooking } = require('./bookingController.js');
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
      const { teacher_id, student_id, notes, messages, roomId } = req.body;
      const saved = await axios.post(`${process.env.SOCKET_PATH}/chat/save`, messages);
      const id = saved.data._id;
      const lesson = await db.Lesson.create({
        teacher_id,
        student_id,
        chat_id: id,
        notes,
      });
      await removeBooking({
        body: { roomId },
      });
      res.status(202).send(lesson);
    } catch (error) {
      console.log('Error with saveLesson', error);
      return;
    }
  },

  fetchAllLessons: async (req, res) => {
    try {
      let { id } = req.params; 
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

  // fetchAllTeachersForCraft: async (req, res) => {
  //   try {
  //     let { craft } = req.params;
  //     let teachers = await db.User.findAll({
  //       where: {
  //         crafts: {
  //           [Op.contains]: [craft]
  //         },
  //         [Op.and]: [{ type: 2 }]
  //       }
  //     });
  //     res.send(teachers);
  //   } catch (error) {
  //     console.log(error);
  //     return;
  //   }
  // }
};
