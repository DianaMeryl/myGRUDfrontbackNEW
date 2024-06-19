const sequelize = require('../database/database')
const { DataTypes } = require('sequelize');

const Teachers = sequelize.define('Teachers', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  },
  { tableName: 'teachers' });

  module.exports = Teachers;
  