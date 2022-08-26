const Sequelize = require('sequelize');

async function eager(sequelize) {
    const User = sequelize.define('user1', { name: Sequelize.DataTypes.STRING}, {timestamps: false});
    const Task = sequelize.define('task', {name: Sequelize.DataTypes.STRING}, {timestamps:false});
    const Tool = sequelize.define('tool', {
        name: Sequelize.DataTypes.STRING,
        size: Sequelize.DataTypes.STRING,
    },{
        timestamps: false
    });

    User.hasMany(Task);
    Task.belongsTo(User);
    User.hasMany(Tool, { as: 'Instruments'});

    try{
        let user, tool, task;
        // user = await User.findOne();
        // tool = await Tool.findOne();
        // await user.setInstruments(tool);
        user = await User.findAll({ include:{model: Task, right: true}});

        // user = await User.findAll({ include: { association: 'Instruments'}});

    //     user = await User.findAll({include: {model: Tool, as: 'Instruments',
    // where: {
    //     size: {[Sequelize.Op.ne]: 'md'}
    // }, required: true}})

//     user = await User.findAll({where: {'$Instruments.size$': { [Sequelize.Op.ne]: 'md'}},
// include: [
//     {
//         model: Tool,
//         as: 'Instruments',
//         required: true
//     }
// ]})
        console.log(JSON.stringify(user, null, 2));

    } catch(e) {
        console.log(e.message);
    }
}

module.exports = eager;