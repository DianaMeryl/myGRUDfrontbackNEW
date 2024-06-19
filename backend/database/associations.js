const sequelize = require('./database');
const Teachers = require('../models/teachers');
const Courses = require('../models/courses');
const Students = require('../models/students');
const StudentsCourses = require('../models/students_courses');


Teachers.hasMany(Courses, { foreignKey: 'teacherID' });
Courses.belongsTo(Teachers, { foreignKey: 'teacherID' });

Students.belongsToMany(Courses, { through: StudentsCourses, foreignKey: 'studentID', onDelete: 'CASCADE'});
Courses.belongsToMany(Students, { through: StudentsCourses, foreignKey: 'coursesID', onDelete: 'CASCADE' });


sequelize
    .sync()
    .then(() => {
        console.log('Succefully Done!');
    })
    .catch((error) => {
        console.log(error);
});
