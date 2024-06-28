"use strict";

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const encryptedSuper = await bcrypt.hash("superadmin123", 10);
    const encryptedAdmin = await bcrypt.hash("admin123", 10);

    return queryInterface.bulkInsert("users", [
      {
        id: 1,
        name: "Super Admin",
        email: "superadmin@gmail.com",
        password: encryptedSuper,
        role: "superadmin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "Admin",
        email: "admin@gmail.com",
        password: encryptedAdmin,
        role: "superadmin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", null, {});
  },
};
