const Sequelize = require('sequelize');
const sequelize= require('../database/connection');


module.exports = sequelize.define("users", {
      id:{
	type: Sequelize.INTEGER,
	primaryKey:true,
	autoIncrement:true
	},
email: {
      	type: Sequelize.STRING(50),
     	allowNull: false,
	unique: true
    },
password: {
      	type: Sequelize.STRING(30),
     	allowNull: false
  }
  },

{

freezeTableName:true,
timestamps:false

});