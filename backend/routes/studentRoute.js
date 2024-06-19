const express = require('express');
const router = express.Router();
const { getAllStudents, 
        getOneStudents, 
        addStudent, 
        updateOneStudent, 
        deleteOneStudent} = require('../controllers/studentController');

router.get('/students', getAllStudents);
router.get('/students/:id', getOneStudents);
router.post('/students', addStudent);
router.put('/students/:id', updateOneStudent);
router.delete('/students/:id', deleteOneStudent);


module.exports = router;