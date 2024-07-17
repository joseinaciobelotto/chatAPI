const jwt = require('jsonwebtoken');
const user = require("../models/userModel");


const checktoken = (token,id,key)=>{

    try{
        
        const verificationer = jwt.verify(token,key);
        
            return verificationer;
    }
    catch(error)
    {
        
    }
};

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