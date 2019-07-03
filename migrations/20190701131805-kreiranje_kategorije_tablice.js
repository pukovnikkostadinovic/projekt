'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
	return queryInterface.createTable("kategorije",{
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
}).then(function(){

return queryInterface.createTable("komponente", {
    id:{
	type: Sequelize.INTEGER,
	primaryKey:true,
	autoIncrement:true
	},
	ime_komponente: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false	
    },

    kratak_opis_komp: {
      type: Sequelize.STRING(400),
      allowNull: true,
      unique: false,
    },
      slika: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: false,
    },
	kateg_id: {
      	type: Sequelize.INTEGER,
     	references:{
	model: 'kategorije',
	key:'id'
	}
    }

  },{

freezeTableName:true,
timestamps:false,
charset:'cp1250',
collate:'cp1250_croatian_ci'

})

});
  },

  down: (queryInterface, Sequelize) => {
	return queryInterface.dropTable("komponente").then(function(){
		return queryInterface.dropTable("kategorije")
	});;  
  }
};
