const jwt = require('jsonwebtoken');

const checktoken = (token,id,key)=>jwt.verify(token,key,(err,decoded)=>{



});

const setToken = async(id,key) =>{

    console.log(id);
    if(id)
    {
        return jwt.sign({id},key,{expiresIn:28800});
    }
    return false;
}

module.exports = {
    checktoken,
    setToken,
}