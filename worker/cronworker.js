const CronJob = require('cron').CronJob;
const db = require('../db/schema.js');
const userController = require('../server/controllers/userController.js');
const feedbackController = require('../server/controllers/feedbackController.js');

const CronWorker = new CronJob('* * * * * *', async () => {
  // try {
  //   let avg = 0;
  //   let list = {};
  //   const teachers = await userController.getAllTeachers(); //gets all users that are teachers
  //   for (let i = 0; i < teachers.length; i++) {
  //     //get all feedbacks where that teacher is listed for each teacher
  //     const feedbacks = await feedbackController.getAllFeedbacksForTeacher(teachers[i].id); 
  //     list[teachers[i]] = feedbacks;
  //   }
  //   for (let j = 0; j < feedbacks.length; j++) {
  //     avg += feedbacks[j].rating;
  //     console.log('avg after adding the ratings ======>', avg);
  //     avg = (avg / feedbacks.length).toPrecision(3);
  //     console.log('avg aft   er calculating avg ==========>', avg);
  //     list[teachers[i].id] = avg;
  //     if (list[teachers[i].id]) {
  //       const user = await db.User.findOne({
  //         where: {
  //           id: teachers[i].id
  //         }
  //       })
  //       const updatedUser = await user.update({
  //         rating: avg
  //       })
  //       console.log(updatedUser.dataValues);
  //     }
  //   }
  // } catch (error) {
  //   console.log('Error with CronWorker', error);
  //   return;
  // }
}, null, true, 'America/Los_Angeles');



module.exports = CronWorker;