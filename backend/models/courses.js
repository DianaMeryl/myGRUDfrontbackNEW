const Teachers = require('./teachers');
const sequelize = require('../database/database')
const { DataTypes } = require('sequelize');

const Courses = sequelize.define('Courses', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        teacherID: {
            type: DataTypes.INTEGER,
            references: {
                model: Teachers,
                key: 'id'
            },
            allowNull: false
        }
        },
        { tableName: 'courses' }
    );
    
    module.exports = Courses;