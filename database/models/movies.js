"use strict";
module.exports = (sequelize, DataTypes) => {
  const Movies = sequelize.define(
    "Movies",
    {
      movieId: DataTypes.STRING,
      movieName: DataTypes.STRING,
      genre: DataTypes.STRING,
      released: DataTypes.DATE,
      rated: DataTypes.STRING,
      IMDB: DataTypes.FLOAT,
      director: DataTypes.STRING,
      writer: DataTypes.STRING,
      actor: DataTypes.STRING,
    },
    {}
  );
  Movies.associate = function (models) {
    // associations can be defined here
    Movies.belongsTo(models.Users, {
      foreignKey: "id",
      as: "user",
      onDelete: "CASCADE",
    });
  };
  return Movies;
};
