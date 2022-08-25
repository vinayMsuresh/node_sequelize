const Sequelize = require('sequelize');

async function association2(sequelize) {
    const User = sequelize.define('user', {
        username: {
            type: Sequelize.DataTypes.STRING
        },
        password: {
            type: Sequelize.DataTypes.STRING,
        }
    }, {
        timestamps: false
    });

    const Post = sequelize.define('post', {
        message: {
            type: Sequelize.DataTypes.STRING,
        }
    },{
        timestamps: false
    });

    User.hasMany(Post, { onDelete: 'CASCADE'});
    Post.belongsTo(User, { onDelete: 'CASCADE'});

    try{
        // await sequelize.sync({alter: true});
        // await User.bulkCreate([
        //     {
        //         username: 'Vinay',
        //         password: '12345456'
        //     },
            
        //     {
        //         username: 'Vijay',
        //         password: '23343'
        //     },
            
        //     {
        //         username: 'Ajay',
        //         password: '3434'
        //     },
            
        //     {
        //         username: 'Kiran',
        //         password: 'w32323'
        //     }
        // ]);

        // await Post.bulkCreate([
        //     {
        //         message: "I'cam online today!!"
        //     },
        //     {
        //         message: "I'cam online today!!"
        //     },
        //     {
        //         message: "I'cam online today!!"
        //     },
        //     {
        //         message: "I'cam online today!!"
        //     },
        //     {
        //         message: "I'cam online today!!"
        //     },
        //     {
        //         message: "I'cam online today!!"
        //     }
        // ])
        let posts, user;
        // user = await User.findOne({where: {username: 'Vinay'}});
        // posts = await Post.findAll();
        
        // console.log(await user.countPosts());

        posts = await Post.findOne();
        user = await User.findOne();
        // await user.removePost(posts);

        // await User.destroy({ where: {username: 'Vinay'}});

        posts.setUser(user);
    } catch(e) {
        console.log(e.message);
    }
}

module.exports = association2;