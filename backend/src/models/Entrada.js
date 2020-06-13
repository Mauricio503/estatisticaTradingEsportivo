const { Model, DataTypes } = require('sequelize');

class Entrada extends Model {
    static init(sequelize){
        super.init({
            times: DataTypes.STRING,
            data: DataTypes.DATE,
            oddsIniciais: DataTypes.STRING,
            tipo: DataTypes.STRING,
        },{
            sequelize
        })
    }
}

module.exports = Entrada;