const { Sequelize, DataTypes, Model } = require('sequelize');

const upperCaseFirst = str => `${str[0].toUpperCase()}${str.substr(1)}`;
async function polymorphic(sequelize) {
    class Image extends Model {}
    Image.init({
        title: DataTypes.STRING,
        url: DataTypes.STRING
    }, {sequelize, modelName: 'image'});

    class Video extends Model {}
    Video.init({
        title: DataTypes.STRING,
        text: DataTypes.STRING
    }, {sequelize, modelName: 'video'});

    class Comment extends Model {
        getCommentable(options) {
            if(!this.CommentableType) return Promise.resolve(null);
            const mixinMethodName = `get${upperCaseFirst(this.CommentableType)}`;
            return this[mixinMethodName](options);
        }
    }

    Comment.init({
        content: DataTypes.STRING,
        commentableId: DataTypes.INTEGER,
        commentableType: DataTypes.STRING
    },{sequelize, modelName: 'comment'});

    Image.hasMany(Comment, {
        foreignKey: 'commentableId',
        constraints: false,
        scope: {
            commentableType: 'image'
        }
    });
    Comment.belongsTo(Image, { foreignKey: 'commentableId', constraints: false});

    Video.hasMany(Comment, {
        foreignKey: 'commentableId',
        constraints: false,
        scope: {
            commentableType: 'video'
        }
    });
    Comment.belongsTo(Video, { foreignKey: 'commentableId', constraints: false});

    Comment.addHook("afterFind", findResult => {
        if (!Array.isArray(findResult)) findResult = [findResult];
        for (const instance of findResult) {
          if (instance.commentableType === "image" && instance.image !== undefined) {
            instance.commentable = instance.image;
          } else if (instance.commentableType === "video" && instance.video !== undefined) {
            instance.commentable = instance.video;
          }
          // To prevent mistakes:
          delete instance.image;
          delete instance.dataValues.image;
          delete instance.video;
          delete instance.dataValues.video;
        }
      });

      class Tag extends Model {
        async getTaggable(options) {
            const images = await this.getImages(options);
            const videos = await this.getVideos(options);
            return images.concat(videos);
        }
      }

      Tag.init({
        name: DataTypes.STRING
      }, { sequelize, modelName: 'tag'});


      class Tag_Taggable extends Model {}
      Tag_Taggable.init({
        tagId: {
            type: DataTypes.INTEGER,
            unique: 'tt_unique_constraint'
        },
        taggableId: {
            type: DataTypes.INTEGER,
            unique: 'tt_unique_constraint',
            references: null,
        },
        taggableType: {
            type: DataTypes.STRING,
            unique: 'tt_unique_constraint',
        }
      }, { sequelize, modelName: 'tag_taggable'});

      Image.belongsToMany(Tag, {
        through: {
            model: Tag_Taggable,
            unique: false,
            scope: {
                taggableType: 'image'
            }
        },
        foreignKey: 'taggableId',
        constraints: false
      })

      Tag.belongsToMany(Image, {
        through: {
            model: Tag_Taggable,
            unique: false,
        },
        foreignKey: 'tagId',
        constraints: false
      })

      Video.belongsToMany(Tag, {
        through: {
            model: Tag_Taggable,
            unique: false,
            scope: {
                taggableType: 'video'
            }
        },
        foreignKey: 'taggableId',
        constraints: false
      })

      Tag.belongsToMany(Video, {
        through: {
            model: Tag_Taggable,
            unique: false,
        },
        foreignKey: 'tagId',
        constraints: false
      })

    try{
        await sequelize.sync({ alter: true});

    } catch(e) {
        console.log('error ', e.message);
    }
}

module.exports = polymorphic;