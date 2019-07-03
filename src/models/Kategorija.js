const Sequelize = require('sequelize');
const sequelize= require('../database/connection');

module.exports = sequelize.define("kategorije",{
	id:{
	type: Sequelize.INTEGER,
	primaryKey:true,
	autoIncrement:true
	},
	ime_kategorije: {
	type: Sequelize.STRING,
	allowNull: false,
	unique: false

	
    },
    kratak_opis: {
      type: Sequelize.STRING(400),
      allowNull: true,
      unique: false,

    }
	
  },
{

freezeTableName:true,
timestamps:false,
charset:'cp1250',
collate:'cp1250_croatian_ci'
});	

