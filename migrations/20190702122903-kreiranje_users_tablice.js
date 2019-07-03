'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("users", {
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
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("users");
  }
};
