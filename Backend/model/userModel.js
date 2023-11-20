const{Sequelize}=require('sequelize')
const  sequelize=require('../config/db')
const userRecords=sequelize.define("userRecords",{
    Id:{
        type:Sequelize.INTEGER,
         allowNull: false,
         autoIncrement: true,
         primaryKey: true
    },
     firstName  :{
        type:Sequelize.STRING
    },
    lastName:{
        type:Sequelize.STRING
    },
    address:{
        type:Sequelize.STRING

    }, 
    mobileNumber:{
        type:Sequelize.STRING

    }, 
    email:{
        type:Sequelize.STRING

    } ,
    password:{
        type:Sequelize.STRING

    }, 
    //  confirmPassword:{
    //     type:Sequelize.STRING

    // } 
})
    module.exports=userRecords

