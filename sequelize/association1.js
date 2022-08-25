const Sequelize = require('sequelize');

async function association1(sequelize) {
    const Country = sequelize.define('country', {
        countryName: {
            type: Sequelize.DataTypes.STRING,
            unique: true
        }
    },{
        timestamps: false
    });

    const Capital = sequelize.define('capital', {
        capitalName: {
            type: Sequelize.DataTypes.STRING,
            unique: true
        }
    },{
        timestamps: false
    });

    Country.hasOne(Capital, {onDelete: 'CASCADE'});
    Capital.belongsTo(Country, {onDelete: 'CASCADE'});

    try{
        await sequelize.sync({alter: true});
        // await Country.bulkCreate([
        //     {
        //         countryName: 'Spain'
        //     },
        //     {
        //         countryName: 'France'
        //     },
        //     {
        //         countryName: 'Germany'
        //     },
        //     {
        //         countryName: 'England'
        //     }
        // ]);

        // await Capital.bulkCreate([
        //     {
        //         capitalName: 'London'
        //     },
        //     {
        //         capitalName: 'Madrid'
        //     },
        //     {
        //         capitalName: 'Paris'
        //     },
        //     {
        //         capitalName: 'Berlin'
        //     }
        // ])

        let capital, country;
        capital = await Capital.findOne({where: { capitalName: 'Paris'}});
        country = await Country.findOne({where: { countryName: 'France'}});
        capital.setCountry(country);
        // console.log(await Country.destroy({where: {countryName: 'Spain'}}));
        // country.setCapital(capital);
        // console.log(await country.getCapital());
        // country = await Country.create({countryName: 'Spain'});
        // capital = await country.createCapital({capitalName: 'Washington DC'});
        // console.log(JSON.parse(JSON.stringify(capital)));
    } catch(er) {
        console.log(er.message);
    }
}

module.exports = association1;