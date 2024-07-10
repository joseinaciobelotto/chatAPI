const {listarSalas} = require("../models/salaModel");

exports.get = async() =>
{
    return await listarSalas();
}