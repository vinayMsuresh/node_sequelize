const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const zlib = require('zlib');

async function myFn(sequelize) {
    const users = sequelize.define('user', {
        userId: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [3, 6]
            }
        },
        password: {
            type: Sequelize.DataTypes.STRING,
            // set(value){
            //     const salt = bcrypt.genSaltSync(12);
            //     const hash = bcrypt.hashSync(value, salt);
            //     this.setDataValue('password', hash);
            // }
        },
        age: {
            type: Sequelize.DataTypes.INTEGER,
            defaultValue: 24,
            validate: {
                isOld(value) {
                    if( value < 21){
                        throw new Error('Too young!!');
                    }
                }
            }
        },
        description: {
            type: Sequelize.DataTypes.STRING,
            set(value) {
                const compressed = zlib.gzipSync(value).toString('base64');
                this.setDataValue('description', compressed);
            },
            get(){
                const value = this.getDataValue('description');
                const uncompressed = zlib.gunzipSync(Buffer.from(value, 'base64'));
                return uncompressed.toString();
            }
        },
        email: {
            type: Sequelize.DataTypes.STRING,
            // validate: {
            //     isIn: {
            //         args: ['helloo@gmail.com', 'hello@gr.com', 'hello@ju.com'],
            //         msg: 'The provided email not be accepted..'
            //     }
            // }
        },
        aboutUser: {
            type: Sequelize.DataTypes.VIRTUAL,
            get(){
                return `${this.username} ${this.description}`
            }
        }
    }, {
        freezeTableName: true,
        // timestamps: false,
        validate: {
            userNamePasswordMatch() {
                if(this.username === this.password) {
                    throw new Error('Password and username must be different..')
                }
                else{
                    console.log('Success');
                }
            }
        },
        paranoid: true,
        deletedAt: 'timeDestroyed'
    })
    try{
        function myFunction() {
            console.log('Logging the statements');
        }
        // await sequelize.authenticate();
        // console.log('Connected successfully');
        await users.sync({alter: true});
        // const user_ins = users.build({username: 'Vinay', password: '1234556', age: 34});
        // console.log(await sequelize.query(`UPDATE user SET email='ajay11@gmail.com' WHERE username='Ajay'`, 
        // {type: Sequelize.QueryTypes.UPDATE}))
        // const age=24
        // console.log(await users.destroy({where:{userId: 15}}));
        console.log(await users.findAll({raw:true, paranoid:false}))
        // console.log(await sequelize.query('SELECT * FROM user where age=$age', { bind: {age}}))
        // const data1 = await users.create({
        //     username: 'Rakesh', 
        //     password: 'Rakesh', 
        //     age: 23, 
        //     email: 'hello@gmail.com',
        //     description: 'skiashdmada wddew jasdjansd'
        // });
        // console.log(await data1.validate());
        // console.log(data1.description);
        // console.log(JSON.parse(JSON.stringify(await users.findAll({where: {userId: 10}}))));
        // user_ins.old = true;
        // await user_ins.save();
        // const user_ins = await users.bulkCreate([
        //     {
        //         username: 'Ajay', 
        //         password: '123', 
        //         age: 23
        //     },
        //     {
        //         username: 'kiran', 
        //         password: '1234556', 
        //         age: 34
        //     }
        // ], {validate: true}
        //     );
        // const results = await users.findAll({ attributes: [['username', 'name'], ['password', 'psd']]});
        // const results = await users.findAll({ attributes: [[sequelize.fn('AVG', sequelize.col('age')), 'average_age']]})
        // const results = await users.findAll({ attributes: { exclude: ['password']} })
        // const results = await users.findAll(
        //     { 
        //         attributes: ['username', 'userId'], 
        //         where: {age: 34, username: 'Vinay'},
        //         order: ['userId'],
        //         // limit: 2
        //     });

        // const grouping_results = await users.findAll({
        //     attributes: [ 'username',
        //     [sequelize.fn('SUM', sequelize.col('age')), 'sum_age']],
        //     group: 'username'
        // });

        // const op_results = await users.findAll({
        //     where: {
        //         [Sequelize.Op.and]: {age: 34, username: 'Vinay'}
        //     }
        // })

        // const op_results2 = await users.findAll({
        //     where: {
        //         age: { [Sequelize.Op.or]: {
        //             [Sequelize.Op.gt]: 34,
        //             [Sequelize.Op.lt]: 25,
        //         }}
        //     }
        // });

        

        // const where_function_results = await users.findAll({
        //     where: sequelize.where(Sequelize.fn('char_length', Sequelize.col('username')), 5)
        // })
        // console.log(JSON.parse(JSON.stringify(where_function_results)));
        // console.log(user_ins.toJSON());
        // await users.update({username: 'Vinay M'}, {where: { username: 'Vinay'}});
        // await users.destroy({where: {age: 34}});
        // console.log(JSON.parse(JSON.stringify(await users.findAll())));
        // console.log(await users.sum('age', { where: { age: { [Sequelize.Op.lt]: 30}}}))
    } catch(e){
        console.log(e);
    }
}

module.exports = myFn;