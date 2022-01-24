"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TypeFood extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TypeFood.belongsTo(models.Resto, {
        as: "restos",
        foreignKey: {
          name: "restoId",
        },
      });
    }
  }
  TypeFood.init(
    {
      nameFood: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TypeFood",
    }
  );
  return TypeFood;
};
