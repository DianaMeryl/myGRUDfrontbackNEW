const sequelize = require('./database');
const Teachers = require('../models/teachers');
const Courses = require('../models/courses');
const Students = require('../models/students');
const StudentsCourses = require('../models/students_courses');
const teachersData = require('../models/data/teachers_data');
const studentData = require('../models/data/students_data');
const coursesData = require('../models/data/courses_data');
const studentsCoursesData = require('../models/data/students_courses_data');

async function databaseFilling(){
    try{
        await sequelize.sync();

        await Teachers.bulkCreate(teachersData);
        await Students.bulkCreate(studentData);
        await Courses.bulkCreate(coursesData);
        await StudentsCourses.bulkCreate(studentsCoursesData);

        console.log('Дані успішно додані до бази даних.');
    }
    catch (error) {
        console.error('Помилка під час додавання даних:', error);
    } finally {
        await sequelize.close(); 
    }
}

databaseFilling();

// !!! ДЛЯ ТОГО ЩОБ ЗАПОВНИТИ ТАБЛИЦЮ ТРЕБА ВИКОНАТИ КОМАНДУ В ТЕРМІНАЛІ: 
// ** node hw71/database/databaseFilling.js