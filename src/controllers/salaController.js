const salaModel = require("../models/salaModel");

exports.get = async() =>
{
    return await salaModel.listarSalas();  
}

