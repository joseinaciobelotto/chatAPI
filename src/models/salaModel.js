const db = require("./db");

let listarSalas = async() =>
{
    let salas = await db.findAll("salas");
    return salas;
}


let buscarSala = async (idsala)=>{
    return db.findOne("salas",idsala);
    
  }
  

  let atualizarMensagens=async (sala)=>{
    return await db.updateOne("salas", sala,{_id:sala._id});
  }
  

  let buscarMensagens = async (idsala, timestamp)=>{
    let sala = await buscarSala(idsala);
    if(sala.msgs){
      let msgs=[];
      sala.msgs.forEach((msg)=>{
        if(msg.timestamp >= timestamp){
          msgs.push(msg);
        }
      });
      return msgs;
    }
    return [];
}


let excluirMensagens = async (idsala, iduser)=>{
  let sala = await buscarSala(idsala);
  try{
  if(sala.msgs){
    
    for (let i = sala.msgs.length - 1; i >= 0; i--) {
      if (sala.msgs[i].nick === iduser) {
        console.log("Removendo mensagem");
        db.deleteMenssagen('salas',idsala,iduser,i);
      }}
      
  }
}catch(error)
  {
    console.log(error)
  }

   

  return [];
}




module.exports = {listarSalas, buscarMensagens, atualizarMensagens, buscarSala,excluirMensagens}