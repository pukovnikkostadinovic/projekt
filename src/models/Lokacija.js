const Sequelize = require('sequelize');
const sequelize= require('../database/connection');

module.exports = sequelize.define("lokacije", {
id:{
	type: Sequelize.INTEGER,
	primaryKey:true,
	autoIncrement:true
	},    
ime_lokacije: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false
    }
},
{
freezeTableName:true,
timestamps:false,
charset:'cp1250',
collate:'cp1250_croatian_ci'
});