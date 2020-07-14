"use strict";
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {}
  );
  Users.associate = function (models) {
    // associations can be defined here
    Users.hasMany(models.Movies, {
      foreignKey: "movieId",
      as: "movie",
      onDelete: "CASCADE",
    });
  };
  return Users;
};
