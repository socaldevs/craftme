const express = require('express');
const studentRouter = require('./studentRouter.js');
const teacherRouter = require('./teacherRouter.js');
const userRouter = require('./userRouter.js');
const authRouter = require('./authRouter.js');

const router = express.Router();

router.use('/student', studentRouter);

router.use('/teacher', teacherRouter);

router.use('/user', userRouter);

router.use('/auth', authRouter);

module.exports = router;
