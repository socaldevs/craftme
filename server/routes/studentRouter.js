const express = require('express');
const lessonsController = require('../controllers/lessonsController.js');
const userController = require('../controllers/userController.js');
const bookingController = require('../controllers/bookingController.js');
const feedbackController = require('../controllers/feedbackController.js');
const messageController = require('../controllers/messageController.js');
const availabilityController = require('../controllers/availabilityController');


const router = express.Router();

//submit a booking for a certain appointment
router.route('/submitBooking').post(bookingController.submitBooking);

//view the current bookings occupying teachers calender
router
  .route('/viewTeacherAvailability/:teacher_id')
  .get(availabilityController.retrieveTeacherAvailability);

//submit feedback after a lesson
router.route('/submitFeedback').post(feedbackController.submitFeedback);

//get all teachers for a certain craft
router
  .route('/fetchAllTeachersForCraft/:craftId')
  .get(userController.getCraftTeachers);

module.exports = router;
