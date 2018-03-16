const express = require('express');
const lessonsController = require('../controllers/lessonsController.js');
const userController = require('../controllers/userController.js');
const bookingController = require('../controllers/bookingController.js');
const feedbackController = require('../controllers/feedbackController.js');
const messageController = require('../controllers/messageController.js');
const router = require('express').Router();

router.route('/saveLesson').post(lessonsController.saveLesson);

router.route('/lessons').get(lessonsController.fetchAllLessons);

router.route('/profile').get(userController.fetchUserInfo);

router.route('/messages').get(messageController.fetchAllMessages);

router.route('/messages/sendMessage').post(messageController.sendMessage);

module.exports = router;
