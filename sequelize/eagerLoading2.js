const Sequelize = require('sequelize');

async function eager2( sequelize ) {
    const Foo = sequelize.define('Foo', { name: Sequelize.DataTypes.TEXT }, {timestamps: false});
    const Bar = sequelize.define('Bar', { name: Sequelize.DataTypes.TEXT }, {timestamps: false});
    Foo.belongsToMany(Bar, { through: 'Foo_Bar' });
    Bar.belongsToMany(Foo, { through: 'Foo_Bar' });

    try{
        let foo, bar;
        // await sequelize.sync({ alter: true});
        // const foo = await Foo.create({ name: 'foo' });
        // const bar = await Bar.create({ name: 'bar' });
        // await foo.addBar(bar);
        // const fetchedFoo = await Foo.findOne({ include: {
        //     model: Bar,
        //     through: {attributes: []}
        // } });
        // console.log(JSON.stringify(fetchedFoo, null, 2));

        // foo = await Foo.findOne({ 
        //     include: {
        //         model: Bar,
        //         through: {
        //             attributes: []
        //         }
        //     }
        // });

        foo = await Foo.findOne({ include: { all: true, nested: true}})
        console.log(JSON.stringify(foo, null, 2));
    } catch(e) {
        console.log(e.message);
    }
    
}

module.exports = eager2;