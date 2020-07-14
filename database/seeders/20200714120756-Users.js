"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "Jane Doe",
          password: "123456",
          email: "janedoe@example.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "Jon Doe",
          password: "123456",
          email: "jondoe@example.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("Users", null, {}),
};
