const express = require('express');
// const sequelize = require('./database/associations');
const studentsRoutes = require('./routes/studentRoute');
const coursesRoutes = require('./routes/coursesRoute');
const path = require('path');
const cors = require('cors');

const PORT = 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'index.html'));
// });

app.use(studentsRoutes);
app.use(coursesRoutes);


app.listen(PORT, () => {
        console.log(`Server is up and running on port ${PORT}`);
    });









































































































// const express = require('express');
// const { StudentService } = require('./services');
// const db = require('./models');

// const PORT = 3000;

// const app = express();
// app.use(express.json());

// app.get('/students', async (req, res) => {
//     const users = await StudentService.getStudents();

//     return res.json(users);
// });

// app.get('/students/:studentId', async (req, res) => {
//     const { params: { studentId } } = req;
//     const users = await StudentService.getStudentById(studentId);

//     return res.json(users);
// });


//     app.post('/students', async (req, res) => {
//     const { body } = req;
//     const user = await StudentService.createStudent(body);

//     return res.status(201).json(user);
// });

// app.put('/students/:studentId', async (req, res) => {
//     const { params: { studentId }, body } = req;

//     const user = await StudentService.updateStudent(studentId, body);

//     return res.json(user);
// });

// app.delete('/students/:studentId', async (req, res) => {
//     const { params: { studentId } } = req;

//     await StudentService.removeStudent(studentId);

//     return res.status(200).end();
// });

// app.listen(PORT, () => {
//     console.log(`Server is up and running on port ${PORT}`);
// });
