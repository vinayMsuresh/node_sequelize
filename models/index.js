const { Sequelize, DataTypes} = require('sequelize');
const dbConfig = require('../config/dbConfig');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
);

sequelize.authenticate().then(() => {
    console.log('Database connected');
}).catch((e)=> {
    console.log(e.message)
});


const db={};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = require('./productModel')(sequelize, DataTypes);
db.reviews = require('./reviewModel')(sequelize, DataTypes);

db.sequelize.sync({force: false}).then(()=> {
    console.log('Yes re-sync done');
}).catch(e => {
    console.log(e.message);
});

module.exports = db;