const Sequelize = require('sequelize');

async function association3(sequelize) {
    const Customer = sequelize.define('customer', {
        customerName: {
            type: Sequelize.DataTypes.STRING
        }
    },{
        timestamps: false
    });
    const Product = sequelize.define('product', {
        productName: {
            type: Sequelize.DataTypes.STRING
        }
    },{
        timestamps: false
    });

    const customerProduct = sequelize.define('customerProduct', {
        customerProductId: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    },{
        timestamps: false
    });


    Customer.belongsToMany(Product, {through: customerProduct});
    Product.belongsToMany(Customer, {through: customerProduct});

    try{
        // await sequelize.sync({ alter: true })
        // await Customer.bulkCreate([
        //     {
        //         customerName: 'Vinay'
        //     },
        //     {
        //         customerName: 'Ajay'
        //     },
        //     {
        //         customerName: 'Abhay'
        //     },
        //     {
        //         customerName: 'Amogh'
        //     },
        //     {
        //         customerName: 'Kiran'
        //     }
        // ]);

        // await Product.bulkCreate([
        //     {
        //         productName: 'Jackets'
        //     },
        //     {
        //         productName: 'Shirts'
        //     },
        //     {
        //         productName: 'Mobiles'
        //     },
        //     {
        //         productName: 'HeadPhones'
        //     },
        //     {
        //         productName: 'Pants'
        //     }
        // ])

        let customer, product;
        // customer = await Customer.findOne();
        // product = await Product.findAll({limit: 3});
        // await customer.addProducts(product)

        // customer = await Customer.findAll({limit: 2});
        // product = await Product.findOne({where:{id: 4}});
        // await product.addCustomers(customer);

        await Customer.destroy({where: {id: 1}});
        
    }
    catch(e) {
        console.log(e.message);
    }
}

module.exports = association3;
