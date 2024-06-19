const StudentService = require('../services/student_service');
const StudentsCourses = require('../models/students_courses');

async function getAllStudents(req, res){
    const students = await StudentService.getStudents();
    return res.json(students); 
}

async function getOneStudents(req, res){
    const {params: {id}} = req;
    const studentById = await StudentService.getStudentById(id);
    return res.json(studentById); 
}

async function addStudent(req, res){
    const { firstName, lastName, age,  courseIds } = req.body;

    if (!firstName || !lastName || !age) {
        return res.status(400).json({ error: 'firstName, lastName and age are required' });
    }
    try {
        const newStudent = await StudentService.createStudent({ firstName, lastName, age });

        if (courseIds && courseIds.length > 0) {
            await StudentsCourses.bulkCreate(
                courseIds.map(courseId => ({
                    studentID: newStudent.id,
                    coursesID: courseId
                }))
            );
        }

        res.status(201).json(newStudent);
    } 
    catch (err) {
        console.error(err);
        if (err.message === 'Студент уже існує') {
            res.status(409).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Не вдалося додати студента' });
        }
    }
};

async function updateOneStudent(req, res) {
    const { id } = req.params;
    const { firstName, lastName, age, courseIds } = req.body;

    try {
        const newStudent = await StudentService.updateStudent(id, { firstName, lastName, age });

        if (courseIds && courseIds.length > 0) {
            
            await StudentsCourses.destroy({ where: { studentID: id } });

            await StudentsCourses.bulkCreate(
                courseIds.map(courseId => ({
                    studentID: id,
                    coursesID: courseId
                }))
            );
        }

        res.status(200).json(newStudent);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Не вдалося оновити студента' });
    }
};

async function deleteOneStudent(req, res) {
    const { id } = req.params;

    try {
        await StudentService.removeStudent(id);
        res.status(204).send(); 
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({ error: 'Не вдалося видалити студента' });
    }
}


module.exports = {
    getAllStudents,
    getOneStudents,
    addStudent,
    updateOneStudent,
    deleteOneStudent
  };