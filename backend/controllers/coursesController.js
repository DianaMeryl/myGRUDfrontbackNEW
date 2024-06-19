const CoursesService = require('../services/courses_service');

async function getAllCourses(req, res){
    const courses = await CoursesService.getCourses();
    return res.json(courses); 
}


module.exports = {
    getAllCourses
};