const db = require('./db')
const sequelize = require('sequelize')

const Usuario = db.Sequelize.define('Carros',{


   placa: {
    type: sequelize.TEXT
   },

   modelo: {
    type: sequelize.TEXT
    
   }
} )

//Usuario.sync({force: true})


module.exports = Usuario;