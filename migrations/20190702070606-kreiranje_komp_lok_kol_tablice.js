'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("komp_lok_kol", {
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
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("komp_lok_kol");
  }
};
