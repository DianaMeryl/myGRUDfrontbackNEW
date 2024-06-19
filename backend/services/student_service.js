const { Students, Courses, Teachers } = require('../models');

async function getStudents() {
  const students = await Students.findAll();

  return students;
}

async function getStudentById(studentId) {
  try {
    const student = await Students.findOne({
      where: { id: studentId },
      include: [
        {
          model: Courses,
          through: { attributes: [] }, 
          include: [
            {
              model: Teachers,
              attributes: ['firstName', 'lastName']
            }
          ]
        }
      ]
    });

    return student;
  } catch (error) {
    console.error('Error fetching student by ID:', error);
  }
}

async function createStudent({ firstName, lastName, age }) {
  try {
    const existingStudent = await Students.findOne({
      where: { firstName, lastName, age },
    });
    if (existingStudent) {
      throw new Error('Студент уже існує');
    }

    const newStudent = await Students.create({ firstName, lastName, age });
    return newStudent;
  } catch (error) {
    console.error('Error creating student:', error);
    throw error;
  }
}

async function updateStudent(userId, user) {
  await Students.update(user, { where: { id: userId } });
  return getStudentById(userId); 
}

async function removeStudent(userId) {
  try {
    await Students.destroy({
        where: {
            id: userId
        }
    });
} catch (error) {
    console.error('Error deleting student:', error);
    throw error;
}
}

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  removeStudent
};
