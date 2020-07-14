"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert("Movies", [
      {
        movieId: "TT334455",
        movieName: "Avengers: infinity war",
        genre: "action, thriller",
        released: "2018-03-15",
        rated: "not rated",
        IMDB: 9.4,
        director: "anthony russo",
        writer: "joe russo",
        actor: "Robert Downey jr, chris, mark,karen",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movieId: "TT334456",
        movieName: "Avengers: endgame",
        genre: "action, thriller",
        released: "2019-03-15",
        rated: "not rated",
        IMDB: 9.5,
        director: "anthony russo",
        writer: "joe russo",
        actor: ",Scarlett,Robert Downey jr, mark,karen",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),

  down: async (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("Movies", null, {}),
};
