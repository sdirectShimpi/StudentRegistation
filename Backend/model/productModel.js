const { Sequelize } = require("sequelize");
const sequelize = require("../config/db");
const userRecords = require("../model/userModel");

const productRecords = sequelize.define("productRecords", {
  Id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  product_name: {
    type: Sequelize.STRING,
  },
  product_price: {
    type: Sequelize.STRING,
  },
  product_category: {
    type: Sequelize.STRING,
  },

  UserId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: userRecords,
      key: "Id",
    },
  },
});

userRecords.hasMany(productRecords, {
  foreignKey: "UserId",
});

productRecords.belongsTo(userRecords, {
  foreignKey: "UserId",
});

module.exports = productRecords;
