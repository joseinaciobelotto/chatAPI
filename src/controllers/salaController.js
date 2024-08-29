const { insertOne } = require("../models/db");
const { deleteMenssagen }= require("../models/db");
const salaModel = require("../models/salaModel");

exports.get = async() =>
{
 
    return await salaModel.listarSalas();  
}

exports.get= async (req, res) => 
{
 
    return await salaModel.listarSalas();
}
  
exports.entrar= async (iduser,idsala)=>{

  console.log("dsa");
    const sala = await salaModel.buscarSala(idsala);
    console.log(sala);
    let usuarioModel=require('../models/userModel');
    let user= await usuarioModel.buscarUsuario(iduser);
    user.sala = {_id:sala._id, nome:sala.nome, tipo:sala.tipo};
    if(await usuarioModel.alterarUsuario(user)){
      return {msg:"OK", timestamp:timestamp=Date.now()};
    }
    return false;
}

exports.enviarMensagem= async (nick, msg, idsala)=>{
    const sala = await salaModel.buscarSala(idsala);
      if(!sala.msgs){
      sala.msgs=[];
    }
    timestamp=Date.now()
    sala.msgs.push(
      {
        timestamp:timestamp,
        msg:msg,
        nick:nick
      }
    )
    let resp = await salaModel.atualizarMensagens(sala);
    return {"msg":"OK", "timestamp":timestamp};
  }
  
  

exports.buscarMensagens = async (idsala, timestamp)=>
  {
    let mensagens=await salaModel.buscarMensagens(idsala, timestamp);
    return {
      "timestamp":mensagens[mensagens.length - 1].timestamp,
      "msgs":mensagens
    };
  }  

  exports.excluirMensagens = async (idsala, iduser)=>
  {
    let mensagens = await salaModel.excluirMensagens(idsala, iduser);

    return {
      "mensagens":mensagens,
      "msgs":  "Usuario saiu da sala",
      
    };

  }
  
  /*
exports.criarSala = async (nome) =>
  {
      try{
        
        const result = await insertOne('salas', { nome });
        return result;
      } catch (error) {
        throw new Error('Erro ao criar sala: ' + error.message);
    }

  }*/