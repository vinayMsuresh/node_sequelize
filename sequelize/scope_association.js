const { Sequelize, DataTypes} = require('sequelize');

async function scope_association(sequelize) {
    const Foo = sequelize.define('foo', { name: DataTypes.STRING}, { timestamps: false});
    const Bar = sequelize.define('bar', { status: DataTypes.STRING}, { timestamps: false});


    Bar.addScope('open', {
        where: {
            status: 'open'
        }
    });

    Foo.hasMany(Bar);
    Foo.hasMany(Bar.scope('open'), { as: 'openBars'});
    // Foo.hasMany(Bar, {
    //     scope: {
    //         status: 'open'
    //     },
    //     as: 'openBars'
    // });

    try{
        await sequelize.sync();
        const myfoo = await Foo.create({ name: 'MyFoo2'});

        await myfoo.getOpenBars();
    } catch (e) {
        console.log(e.message);
    }
}


module.exports = scope_association;