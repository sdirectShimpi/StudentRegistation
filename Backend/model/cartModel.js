
const { Sequelize } = require('sequelize');
const sequelize = require('../config/db');
const userRecords = require('../model/userModel');
const productRecords = require('../model/productModel');

const cartRecords = sequelize.define("cartRecords", {
  Id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: Sequelize.INTEGER, 
    references: {
      model: userRecords,
      key: 'Id' 
    }
  },
  productId: {
    type: Sequelize.INTEGER, 
    references: {
      model: productRecords,
      key: 'Id' 
    }
  },
  productCount: {
    type: Sequelize.STRING
  },
});

cartRecords.belongsTo(userRecords, {
  foreignKey: "userId",
 
});

userRecords.hasMany(cartRecords, {
  foreignKey: "userId",
  
});

cartRecords.belongsTo(productRecords, {
  foreignKey: "productId",

});

productRecords.hasMany(cartRecords, {
  foreignKey: "productId",

});

module.exports = cartRecords;
