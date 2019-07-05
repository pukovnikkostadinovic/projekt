'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.createTable("users", {
id:{
	type:Sequelize.INTEGER,
	primaryKey: true,
	autoIncrement: true
	},
      name:{
	type: Sequelize.STRING(20),
	allowNull: false,
	unique: false
	},
email: {
      	type: Sequelize.STRING(50),
     	allowNull: false,
	unique: true
    },
password: {
      	type: Sequelize.STRING,
     	allowNull: false
  },
raz_ovl: {
      	type: Sequelize.INTEGER(1),
     	allowNull: false,
	defaultValue: 0,
  	validate:{
		      isIn: [[0,1, 2, 3]]
	}
	}
  },
{

freezeTableName:true,
timestamps:false

});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.dropTable("users");
  }
};
