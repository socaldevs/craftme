const express = require('express');
const lessonsController = require('../controllers/lessonsController.js');
const userController = require('../controllers/userController.js');
const bookingController = require('../controllers/bookingController.js');
const feedbackController = require('../controllers/feedbackController.js');
const messageController = require('../controllers/messageController.js');

const router = require('express').Router();

router.route('/addTeacher').post(userController.addTeacherOrStudent);

router.route('/submitAvailability').post(bookingController.submitAvailability);

module.exports = router;
