
const sequelize = require('sequelize')



const Sequelize = new sequelize('cadastroCarro', 'root', 'jean201698', {
    host: 'localhost',
    dialect: 'mysql'
})




module.exports = {
    Sequelize: Sequelize
}

