const express = require('express');
const lessonsController = require('../controllers/lessonsController.js');
const userController = require('../controllers/userController.js');
const bookingController = require('../controllers/bookingController.js');
const feedbackController = require('../controllers/feedbackController.js');
const messageController = require('../controllers/messageController.js');
const conversationController = require('../controllers/conversationController.js');
const router = require('express').Router();

//saves lesson after it has ended
router.route('/saveLesson').post(lessonsController.saveLesson);

//loads upcoming lessons and past lessons
// router.route('/fetchAllLessons/:id').get(lessonsController.fetchAllLessons);
router.route('/fetchAllLessons/:id').get(lessonsController.fetchAllLessons);

//gets chat for a specific lesson
router
  .route('/fetchMongoChatById/:id')
  .get(lessonsController.fetchMongoChatById);

//gets all conversations for a user
router
  .route('/messages/fetchAllConversationsById/:id')
  .get(conversationController.fetchAllConversationsById);

//gets all messages for a convefsation
router
  .route('/messages/fetchAllMessagesByConversationId/:id')
  .get(conversationController.fetchAllMessagesByConversationId);

//adds a new user to the database
//Here is route
//
//
//
//
//
//
//
//
router.route('/addTeacherOrStudent').post(userController.addTeacherOrStudent);

//gets a user's profile/info
router.route('/fetchUserInfo/:id').get(userController.fetchUserInfo);

//updates a user's profile/info
router.route('/updateUserInfo').put(userController.updateUserInfo);

//start a conversation
router.route('/messages/sendMessage').post(messageController.sendMessage);

//continues a conversation
// router.route('/messages/replyMessage').post(messageController.replyMessage);

//grabs an id given the username
router.route('/getIdByUsername/:username').get(userController.getIdByUsername);

// return all the crafts 
router.route('/getAllCrafts').get(userController.getAllCrafts);

router.route('/getCraftTeachers/:craftId').get(userController.getCraftTeachers);

// get translation
router.route('/translate').post(userController.getTranslation);

// get list of languages
router.route('/languages').get(userController.getLanguageList);

// router.route('/getAllBookingsForUser/:userId').get(bookingController.getAllBookingsForUser);
router.route('/getAllBookingsForUser/:id').get(bookingController.getAllBookingsForUser);

//get all ratings for a specific teacher
router.route('/calculateAverageRatingForTeacher/').put(feedbackController.calculateAverageRatingForTeacher);

//get conversationid given userid and senderid
router.route('/getConversationId/:user_id/:sender_id').get(messageController.getConversationId);

//get all feedbacks for a specific lesson
// router.route('/fetchFeedbackForLesson/:lesson_id').get(feedbackController.fetchFeedbackForLesson);

//TEST path
// router.route('/calculateAverageRatingForAllTeachers').get(feedbackController.calculateAverageRatingForAllTeachers);

module.exports = router;