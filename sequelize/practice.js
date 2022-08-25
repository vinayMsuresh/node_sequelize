const Sequelize = require('sequelize');

async function practice(sequelize) {
    const students = sequelize.define('students', {
        student_id: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4, 20]
            },
            get() {
                const rawValue = this.getDataValue('name');
                return rawValue.toUpperCase();
            }
        },
        favourite_class: {
            type: Sequelize.DataTypes.STRING,
            defaultValue: 'Computer Science'
        },
        school_year: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false
        },
        subscribed: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: true,
        }
    }, {
        timestamps: false
    })

    try{ 
        await students.sync({alter: true});
        // await students.bulkCreate([
        //     {
        //         name: 'Vinay',
        //         school_year: 12,
        //     },
        //     {
        //         name: 'Ajay',
        //         school_year: 14,
        //         favourite_class: 'Mathematics'
        //     },
        //     {
        //         name: 'Kiran',
        //         school_year: 11,
        //         subscribed: false
        //     },
        //     {
        //         name: 'Akash',
        //         school_year: 12,
        //         favourite_class: 'Science'
        //     },
        //     {
        //         name: 'Joenry',
        //         school_year: 13,
        //     }
        // ], {validate: true})

        // console.log( JSON.parse(JSON.stringify(
        //             await students.findAll({ where: { [Sequelize.Op.or]: {
        //                 favourite_class: 'Computer Science',
        //                 subscribed: true
        //             }}})
        //         ))
        //     )
        // console.log(JSON.parse(JSON.stringify(
        //     await students.findAll({attributes: ['school_year', [Sequelize.fn('COUNT', Sequelize.col('school_year')), 'num_students']],
        //     group: 'school_year'})
        // )))
        // console.log(await students.findAll({where: {school_year: 12}, raw: true}));

        console.log(JSON.parse(JSON.stringify(await students.findByPk(1))));

        // console.log(await students.findOne({raw:true}))

        // console.log(await students.findAndCountAll({where: {school_year: 12}, raw: true}))
    }
    catch(e) {
        console.log(e.message);
    }
}

module.exports = practice;