const Sequelize = require("sequelize");

const sequelize = new Sequelize('baza_komponenti2', 'dlibreman', 'dlibreman',{host:'localhost', dialect:'mysql', operatorsAliases: false});

module.exports = sequelize;

