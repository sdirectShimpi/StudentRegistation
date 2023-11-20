const Sequelize=require('sequelize')
const db=require('../config/db')
const productRecord = require('./productModel')
const userRecords = require('./userModel')
const orderRecord=db.define("orderRecord",
{

    Id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    userId:{
         type:Sequelize.INTEGER,
         allowNull:false,
         references:
         {
            model:userRecords,
            key:"Id"
         }
          },
    
    productId:{
        type:Sequelize.INTEGER,
         allowNull:false,
         references:
         {
            model:productRecord,
            key:"Id"
         }
          },
    productCount:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    total:
    {
        type:Sequelize.INTEGER,
        allowNull:false
    }
})



userRecords.hasMany(orderRecord,{
    foreignKey:"userId"
})
orderRecord.belongsTo(userRecords,{
    foreignKey:"productId"
})

productRecord.hasMany(orderRecord,{
    foreignKey:"productId"
})
orderRecord.belongsTo(productRecord,{
    foreignKey:"productId"
})

module.exports=orderRecord