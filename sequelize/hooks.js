const { Sequelize, DataTypes, Model} = require('sequelize');
const bcrypt = require('bcrypt');
async function hooks( sequelize ) {
    class User extends Model {}
    User.init({
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        mood: {
            type: DataTypes.STRING,
            values: ['happy', 'sad', 'neutral']
        }
    }, { 
        sequelize, 
        modelName: 'user1', 
        indexes: [{ 
            unique: true, 
            fields: ['username']
        }]
    });
    User.addHook('beforeCreate', (user, options) => {
        const salt = bcrypt.genSaltSync(10);
        const pass = bcrypt.hashSync(user.password, salt);
        user.password = pass;
    }) ;

    User.addHook('afterFind', (user, options) => {
        if(user.mood === 'happy'){
            user.happiness = 'wonderfull';
        }
    })

    User.addScope('happyUsers', {
        where: {
            mood: "happy"
        }
    });

    User.addScope('sadUsers', {
        where: {
            mood: "sad"
        }
    });

    User.addScope('userAjay',{
        where: {
            username: 'Ajay'
        }
    })


    try{
        await User.sync({ alter: true});
       

        // const user = await User.findAll({where: { mood: 'happy'}});
        const user = await User.scope(['sadUsers', 'userAjay']).findAll({ where: { username: 'Vinay'}});
        const user2 = await User.scope(['happyUsers']).findAll();

        console.log('user', JSON.stringify(user, null, 2));
        console.log('user2',JSON.stringify(user2, null, 2));

    }
    catch(e) {
        console.log('error:-> ',e)
    }
}

module.exports = hooks;