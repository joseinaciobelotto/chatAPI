const db = require("./db");

let listarSalas = async() =>
{
    let salas = await db.findAll("salas");
    return salas;
}

module.exports = {listarSalas}