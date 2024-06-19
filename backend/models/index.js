const Students = require('./students');
const Courses = require('./courses');
const Teachers = require('./teachers');
const StudentsCourses = require('./students_courses');

require('../database/associations');

module.exports = {
  Students,
  Courses,
  Teachers,
  StudentsCourses
};