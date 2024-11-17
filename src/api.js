const express = require("express");
const app = express();
app.use ( express.urlencoded({extends:true}));
app.use(express.json());
const token = require('./util/token');

const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:5171/', 
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const router = express.Router();
app.use('/', router.get('/', (req,res)=>{
    res.status(200).send("<h1>API - CHAT</h1>")}));


app.use('/', router.get('/sobre', (req,res)=>
{
    res.status(200).send({
    "nome":"API-CHAT",        
    "versão":"1.0.0",
    "autor":"José Inácio"
    })
}));


app.use('/salas', router.get('/salas', async (req,res)=>{
    const salaController = require('./controllers/salaController');
    const resp = await salaController.get();
    res.status(200).send(resp)

}));

app.use('/', router.get('/salas', async(req,res) =>
{
    const salaController = require('./controllers/salaController');
    const resp = await salaController.get();
    res.status(200).send(resp);
}))

app.use('/entrar', router.post('/entrar', async(req,res,next) =>
{
    const userController = require('./controllers/userController');
    let resp = await userController.entrar(req.body.nick);
    res.status(200).send(resp);
}))

app.use("/salas",router.get("/salas", async (req, res,next) => 
    {
    if(await token.checkToken(req.headers.token,req.headers.iduser,req.headers.nick)) 
    {
    let resp= await salaController.get();
    res.status(200).send(resp);
  }
  else
  {
    res.status(400).send({msg:"Usuário não autorizado"});
  }
}))

app.use("/sala/entrar", router.put("/sala/entrar", async (req, res)=>
    {
    if(!token.checkToken(req.headers.token,req.headers.iduser,req.headers.nick)) return false;
    console.log("1111");
    const salaController = require('./controllers/salaController');
    console.log(req.query.idsala);
    let resp= await salaController.entrar(req.headers.iduser, req.query.idsala);
   
    res.status(200).send(resp);
}))
  
app.use("/sala/mensagem/", router.post("/sala/mensagem", async (req, res) => 
    {
    if(!token.checkToken(req.headers.token,req.headers.iduser,req.headers.nick)) return false;
    const salaController = require('./controllers/salaController');
    let resp= await salaController.enviarMensagem(req.headers.nick, req.body.msg, req.body.idSala);
    res.status(200).send(resp);
}))
  
app.use("/sala/mensagens/", router.get("/sala/mensagens", async (req, res) => 
    {
    if(!token.checkToken(req.headers.token,req.headers.iduser,req.headers.nick)) return false;
    const salaController = require('./controllers/salaController');
    let resp= await salaController.buscarMensagens(req.query.idSala, req.query.timestamp);
    res.status(200).send(resp);
}))

  /*
app.use("/sala/criar", router.get("/sala/criar", async (req, res) => 
    {
    if(!token.checkToken(req.headers.token,req.headers.iduser,req.headers.nick)) return false;
    let resp= await salaController.criarSala(req.query.nome);
    res.status(200).send(resp);
}))*/

app.use("/sala/sair", router.get("/sala/sair", async (req, res) => 
    {
        
        
    if(!token.checkToken(req.headers.token,req.headers.iduser,req.headers.nick)) return false;
    const salaController = require('./controllers/salaController');
    let resp= await salaController.excluirMensagens(req.query.idSala, req.headers.nick);
    
    res.status(200).send(resp);
}))


module.exports = app;

export default app;