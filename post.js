'use strict';
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  process.env.DATABASE_URL　|| 'postgres://postgres:postgres@localhost/questionnaire',
  {
    logging:false,
    operatorsAliases:false
  });

const Post = sequelize.define('Post',{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    primaryKey:true
  },
  chapter:{
    type:Sequelize.STRING
  },
  content:{
    type:Sequelize.TEXT
  },
  postedBy:{
    type:Sequelize.STRING
  }
},{
    freezeTableName: true,
    timestamps: true
});

Post.sync();
module.exports = Post;