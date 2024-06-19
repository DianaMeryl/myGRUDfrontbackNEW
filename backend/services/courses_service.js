const { Courses } = require('../models');

async function getCourses() {
    const courses = await Courses.findAll();
  
    return courses;
  }
  

  module.exports = {
    getCourses
  };