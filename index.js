const Sequelize = require('sequelize');
const myFn = require('./myFun');
const practice = require('./practice');
const sequelize = new Sequelize('sequelize1', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
})

myFn(sequelize);
// practice(sequelize);
