const Sequelize=require('sequelize')
const sequelize = new Sequelize(
    'db_sdirect',
    'sdirect',
    'Sm@rtPu92023',
     {
       host: '192.168.0.2',
       dialect: 'mysql'
     }
   );
   
   sequelize.authenticate().then(() => {
      console.log('Connection has been established successfully.');
   }).catch((error) => {
      console.error('Unable to connect to the database: ', error);
   });
  
   module.exports=sequelize