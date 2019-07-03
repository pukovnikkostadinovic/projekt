const Sequelize = require("sequelize");

const sequelize = new Sequelize('baza_komponenti2', 'root', 'dlibreman',{host:'localhost', dialect:'mysql', operatorsAliases: false});

module.exports = sequelize;

