const Students = require('./students');
const Courses = require('./courses');
const sequelize = require('../database/database')
const { DataTypes } = require('sequelize');

    const StudentsCourses = sequelize.define('StudentsCourses', {
        studentID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: Students,
                key: "id"
            },
            allowNull: false,
            onDelete: 'CASCADE'
        },
        coursesID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: Courses,
                key: "id"
            },
            allowNull: false,
            onDelete: 'CASCADE'
        }
    },
    { tableName: 'studentscourses',
        timestamps: false
    }
)
module.exports =  StudentsCourses;

    