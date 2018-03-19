const router = require('express').Router();
const { testController } = require('../controllers/mongoController'); 

router.get('/chat', testController);

//router.get('/chat/load', someController);
router.post('/chat/save', (req, res) => res.send('hello from chat/save'));

module.exports = { router };


