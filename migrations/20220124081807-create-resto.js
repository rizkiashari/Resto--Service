"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Restos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      namaResto: {
        type: Sequelize.STRING,
      },
      open: {
        type: Sequelize.STRING,
      },
      close: {
        type: Sequelize.STRING,
      },
      picture: {
        type: Sequelize.STRING,
      },
      addressResto: {
        type: Sequelize.STRING,
      },
      locationResto: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Restos");
  },
};
