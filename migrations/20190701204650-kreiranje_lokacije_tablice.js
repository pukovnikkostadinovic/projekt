'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("lokacije", {
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
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("lokacije");
  }
};
