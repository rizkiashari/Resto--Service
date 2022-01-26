"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Resto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Resto.hasOne(models.TypeFood, {
        as: "typeFoods",
        foreignKey: {
          name: "restoId",
        },
      });
    }
  }
  Resto.init(
    {
      namaResto: DataTypes.STRING,
      open: DataTypes.STRING,
      close: DataTypes.STRING,
      picture: DataTypes.STRING,
      locationResto: DataTypes.STRING,
      addressResto: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Resto",
    }
  );
  return Resto;
};
