const { Sequelize, DataTypes} = require('sequelize');

async function associationMN(sequelize){
    // const User = sequelize.define('user', {
    //       username: DataTypes.STRING,
    //       points: DataTypes.INTEGER
    //     }, { timestamps: false });

    //   const Profile = sequelize.define('profile', {
    //       name: DataTypes.STRING
    //     }, { timestamps: false });

    //   const Grant = sequelize.define('grant', {
    //       id: {
    //         type: DataTypes.INTEGER,
    //         primaryKey: true,
    //         autoIncrement: true,
    //         allowNull: false
    //       },

    //       selfGranted: DataTypes.BOOLEAN
    //     }, { timestamps: false });

        // const Product = sequelize.define('product',{
        //   name: DataTypes.STRING
        // },{timestamps: false});

        // const Category = sequelize.define('category',{
        //   name: DataTypes.STRING
        // },{timestamps: false});

        // Product.belongsToMany(Category, { 
        //   as: 'groups', 
        //   through: 'product_categories',
        //   foreignKey: 'objectId',
        //   otherKey: 'typeId'
        // });
        // Category.belongsToMany(Product, { 
        //   as: 'items', 
        //   through: 'product_categories',
        //   foreignKey: 'typeId',
        //   otherKey: 'ObjectId'
        // });

        const Player = sequelize.define('Player', { username: DataTypes.STRING });
        const Team = sequelize.define('Team', { name: DataTypes.STRING });
        const Game = sequelize.define('Game', { name: DataTypes.STRING });

        // We apply a Super Many-to-Many relationship between Game and Team
        const GameTeam = sequelize.define('GameTeam', {
          id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          }
        });
        Team.belongsToMany(Game, { through: GameTeam });
        Game.belongsToMany(Team, { through: GameTeam });
        GameTeam.belongsTo(Game);
        GameTeam.belongsTo(Team);
        Game.hasMany(GameTeam);
        Team.hasMany(GameTeam);

        // We apply a Super Many-to-Many relationship between Player and GameTeam
        const PlayerGameTeam = sequelize.define('PlayerGameTeam', {
          id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          }
        });
        Player.belongsToMany(GameTeam, { through: PlayerGameTeam });
        GameTeam.belongsToMany(Player, { through: PlayerGameTeam });
        PlayerGameTeam.belongsTo(Player);
        PlayerGameTeam.belongsTo(GameTeam);
        Player.hasMany(PlayerGameTeam);
        GameTeam.hasMany(PlayerGameTeam);

    try {
      await sequelize.sync({ alter:true});
      // await Player.bulkCreate([
      //   { username: 's0me0ne' },
      //   { username: 'empty' },
      //   { username: 'greenhead' },
      //   { username: 'not_spock' },
      //   { username: 'bowl_of_petunias' }
      // ]);
      // await Game.bulkCreate([
      //   { name: 'The Big Clash' },
      //   { name: 'Winter Showdown' },
      //   { name: 'Summer Beatdown' }
      // ]);
      // await Team.bulkCreate([
      //   { name: 'The Martians' },
      //   { name: 'The Earthlings' },
      //   { name: 'The Plutonians' }
      // ]);

      // await GameTeam.bulkCreate([
      //   { GameId: 1, TeamId: 1 },   // this GameTeam will get id 1
      //   { GameId: 1, TeamId: 2 },   // this GameTeam will get id 2
      //   { GameId: 2, TeamId: 1 },   // this GameTeam will get id 3
      //   { GameId: 2, TeamId: 3 },   // this GameTeam will get id 4
      //   { GameId: 3, TeamId: 2 },   // this GameTeam will get id 5
      //   { GameId: 3, TeamId: 3 }    // this GameTeam will get id 6
      // ]);

      // await PlayerGameTeam.bulkCreate([
      //   // In 'Winter Showdown' (i.e. GameTeamIds 3 and 4):
      //   { PlayerId: 1, GameTeamId: 3 },   // s0me0ne played for The Martians
      //   { PlayerId: 3, GameTeamId: 3 },   // greenhead played for The Martians
      //   { PlayerId: 4, GameTeamId: 4 },   // not_spock played for The Plutonians
      //   { PlayerId: 5, GameTeamId: 4 }    // bowl_of_petunias played for The Plutonians
      // ]);

      const game = await Game.findOne({
        where: {
          name: 'Winter Showdown'
        },
        include: {
          model: GameTeam,
          include: [
            {
              model: Player,
              through: {attributes: []}
            },
            Team
          ]
        }
      })
      console.log(`Found game: "${game.name}"`);
      for (let i = 0; i < game.GameTeams.length; i++) {
        const team = game.GameTeams[i].Team;
        const players = game.GameTeams[i].Players;
        console.log(`- Team "${team.name}" played game "${game.name}" with the following players:`);
        console.log(players.map(p => `--- ${p.username}`).join('\n'));
      }    }
    catch(e){
        console.log('error',e.message);
    }

}

module.exports = associationMN;