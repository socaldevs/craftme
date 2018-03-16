const express = require('express');
const studentRouter = require('./studentRouter.js');
const teacherRouter = require('./teacherRouter.js');
const userRouter = require('./userRouter.js');

const router = express.Router();

router.use('/student', studentRouter);

router.use('/teacher', teacherRouter);

router.use('/user', userRouter);

module.exports = router;
