const Sequelize = require('sequelize');
const myFn = require('./myFun');
const practice = require('./practice');
const association1 = require('./association1');
const association2 = require('./association2');
const association3 = require('./association3');
const sequelize = new Sequelize('sequelize1', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
})

// myFn(sequelize);
// practice(sequelize);
// association1(sequelize);
// association2(sequelize);
association3(sequelize);