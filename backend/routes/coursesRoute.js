const express = require('express');
const router = express.Router();
const { getAllCourses } = require('../controllers/coursesController');

router.get('/courses', getAllCourses);


module.exports = router;