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
  let sala =  db.findOne("salas",idsala);
  console.log("Removendo mensagem");
 try{
  let user =  db.findOne("usuarios",idsala);
  user.sala = null;
 db.updateOne("usuarios",  user.sala, iduser);
  if(sala.msgs){
    
    for (let i = 0 ; i < sala.msgs.length - 1 ; i++) {
      if (sala.msgs[i].nick === iduser) {
        console.log("Removendo mensagem");
        sala.splice(i,10000);
        let sala =  db.updateOne("salas", sala,{_id:idsala});
      }}
      let user =  db.findOne("usuarios",idsala);
       user.sala = null;
      db.updateOne("usuarios",  user.sala, iduser);
   
      return salaMsgDelete;
  }
}catch(error)
  {
    console.log(error)
  }

  return [];

 
}




module.exports = {listarSalas, buscarMensagens, atualizarMensagens, buscarSala,excluirMensagens}