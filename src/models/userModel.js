const db = require("./db");
async function registrarUser(nick)
{
    return await db.insertOne("usuario", {"nick":nick});


}

module.exports = {registrarUser}