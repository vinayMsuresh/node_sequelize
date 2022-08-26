const { Sequelize, DataTypes} = require('sequelize');

async function associationMN(sequelize){
    const User = sequelize.define('user', {
        username: DataTypes.STRING,
        points: DataTypes.INTEGER
      }, { timestamps: false });
      const Profile = sequelize.define('profile', {
        name: DataTypes.STRING
      }, { timestamps: false });

      const User_Profile = sequelize.define('User_Profile', {
        selfGranted: DataTypes.BOOLEAN
      }, { timestamps: false });
      User.belongsToMany(Profile, { through: User_Profile });
      Profile.belongsToMany(User, { through: User_Profile });

    try {
        await sequelize.sync();
        const amidala = await User.create({ username: 'p4dm3', points: 1000 });
        const queen = await Profile.create({ name: 'Queen' });
        await amidala.addProfile(queen, { through: { selfGranted: false } });
        const result = await User.findOne({
            where: { username: 'p4dm3' },
            include: Profile
            });
        console.log(JSON.stringify(result, null, 2));
    }
    catch(e){
        console.log(e.message);
    }

}

module.exports = associationMN;