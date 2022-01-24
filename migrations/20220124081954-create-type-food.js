"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("TypeFoods", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nameFood: {
        type: Sequelize.STRING,
      },
      pictureFood: {
        type: Sequelize.STRING,
      },
      restoId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Restos",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
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
    await queryInterface.dropTable("TypeFoods");
  },
};
