const Sequelize = require('sequelize');
const myFn = require('./sequelize/myFun');
const practice = require('./sequelize/practice');
const association1 = require('./sequelize/association1');
const association2 = require('./sequelize/association2');
const association3 = require('./sequelize/association3');
const association4 = require('./sequelize/association4');
const associationMN = require('./sequelize/associationMN');
const scope_association = require('./sequelize/scope_association');
const eager = require('./sequelize/eagerLoading');
const eager2 = require('./sequelize/eagerLoading2');
const polymorphic = require('./sequelize/polymorphic');
const hooks = require('./sequelize/hooks');
const sequelize = new Sequelize('node_mysql', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
})

// myFn(sequelize);
// practice(sequelize);
// association1(sequelize);
// association2(sequelize);
// association3(sequelize);
// eager(sequelize);
// eager2(sequelize);
// association4(sequelize);
// associationMN(sequelize);
// scope_association(sequelize);
// polymorphic(sequelize);
hooks(sequelize);