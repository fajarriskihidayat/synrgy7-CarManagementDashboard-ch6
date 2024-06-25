"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("car_sizes", [
      {
        id: 1,
        size: "small",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        size: "medium",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        size: "large",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("car_sizes", null, {});
  },
};
