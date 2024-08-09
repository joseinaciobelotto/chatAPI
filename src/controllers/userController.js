const token = require("../util/token");
const userModel = require("../models/userModel");

exports.entrar = async(nick)=>
{
    let resp = await userModel.registrarUser(nick);
    if(resp.insertedId)
    {
        return {"idUser":resp.insertedId,
                "token": await token.setToken(JSON.stringify(resp.insertedId).replace(/"/g,''),nick),
                "nick":nick}
            }
}
