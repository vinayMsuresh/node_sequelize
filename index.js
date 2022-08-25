const Sequelize = require('sequelize');
const myFn = require('./sequelize/myFun');
const practice = require('./sequelize/practice');
const association1 = require('./sequelize/association1');
const association2 = require('./sequelize/association2');
const association3 = require('./sequelize/association3');
const sequelize = new Sequelize('sequelize1', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
})

// myFn(sequelize);
// practice(sequelize);
// association1(sequelize);
// association2(sequelize);
association3(sequelize);