const Sequelize = require('sequelize');

async function association4( sequelize ) {
    class User extends Sequelize.Model {}
    User.init({
        firstName: Sequelize.STRING,
        lastName: Sequelize.STRING,
    }, { sequelize, modelName: 'user2',});


    class Product extends Sequelize.Model {}
    Product.init({
        title: Sequelize.STRING,
    }, { sequelize, modelName: 'product1',});

    class Address extends Sequelize.Model {}
    Address.init({
        type: Sequelize.DataTypes.STRING,
        line1: Sequelize.STRING,
        line2: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
        zip: Sequelize.STRING
    }, { sequelize, modelName: 'address',});

    class Tag extends Sequelize.Model {}
    Tag.init({
    name: Sequelize.STRING
    }, { sequelize, modelName: 'tag' });


    // Product.User = Product.belongsTo(User);
    // User.Address = User.hasMany(Address);

    try{
        
        // await Product.create({
        //     title: 'Chair',
        //     user2: {
        //       firstName: 'Mick',
        //       lastName: 'Broadstone',
        //       addresses: [{
        //         type: 'home',
        //         line1: '100 Main St.',
        //         city: 'Austin',
        //         state: 'TX',
        //         zip: '78704'
        //       }]
        //     }
        //   },{
        //     include: [{
        //       association: Product.User,
        //       include: [ User.Address ]
        //     }]
        //   });
        const Categories = Product.hasMany(Tag, { as: 'categories' });

        await sequelize.sync({ alter: true})

        await Product.create({
        title: 'Chair',
        categories: [
            { id: 1, name: 'Alpha' },
            { id: 2, name: 'Beta' }
        ]
        }, {
        include: [{
            association: Categories,
            as: 'categories'
        }]
        })
    } catch(e) {
        console.log(e);
    }

}

module.exports = association4;