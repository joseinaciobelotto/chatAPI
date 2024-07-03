const express = require("express");
const app = express();
app.use ( express.urlencoded({extends:true}));
app.use(express.json());

const router = express.Router();
app.use('/', router.get('/', (req,res)=>{
    res.status(200).send("<h1>API - CHAT</h1>")}))

module.exports = app;