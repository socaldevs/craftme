const express = require('express');
const lessonsController = require('../controllers/lessonsController.js');
const userController = require('../controllers/userController.js');
const bookingController = require('../controllers/bookingController.js');
const feedbackController = require('../controllers/feedbackController.js');
const messageController = require('../controllers/messageController.js');

const router = express.Router();

router.route('/book').post(bookingController.requestBooking);

router.route('/feedback').post(feedbackController.submitFeedback);

router.route('/:craft').get(lessonsController.fetchAllTeachersForLesson);

module.exports = router;
