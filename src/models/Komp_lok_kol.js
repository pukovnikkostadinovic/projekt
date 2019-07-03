const Sequelize = require('sequelize');
const sequelize= require('../database/connection');


module.exports = sequelize.define("komp_lok_kol", {
      id:{
	type: Sequelize.INTEGER,
	primaryKey:true,
	autoIncrement:true
	},
komp_id: {
      	type: Sequelize.INTEGER,
     	references:{
	model: 'komponente',
	key:'id'
	}
    },
lok_id: {
      	type: Sequelize.INTEGER,
     	references:{
	model: 'lokacije',
	key:'id'
	}
    },
	kolicina: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue:0
    }

  },

{

freezeTableName:true,
timestamps:false

});