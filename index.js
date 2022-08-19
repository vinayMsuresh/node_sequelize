const Sequelize = require('sequelize');

const sequelize = new Sequelize('sequelize1', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
})

const users = sequelize.define('user', {
    userId: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 6]
        }
    },
    password: {
        type: Sequelize.DataTypes.STRING
    },
    age: {
        type: Sequelize.DataTypes.INTEGER,
        initialValue: 24,
    }
}, {
    freezeTableName: true,
    timestamps: false
})
async function myFn() {
    try{
        // await sequelize.authenticate();
        // console.log('Connected successfully');
        await users.sync({alter: true});
        // const user_ins = users.build({username: 'Vinay', password: '1234556', age: 34});
        // user_ins.old = true;
        // await user_ins.save();
        const user_ins = await users.bulkCreate([
            {
                username: 'Ajay', 
                password: '123', 
                age: 23
            },
            {
                username: 'kiran', 
                password: '1234556', 
                age: 34
            }
        ], {validate: true}
            );
        // console.log(user_ins.toJSON());
    } catch(e){
        console.log(e);
    }
}

myFn();
console.log(sequelize.models.user);

