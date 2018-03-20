const router = require('express').Router();
const { saveChat, fetchChat } = require('../controllers/mongoController'); 

router.get('/chat/fetch/:id', fetchChat);
router.post('/chat/save', saveChat);

module.exports = { router };


