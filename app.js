"use strict";
const express = require("express");
const requestHandlers = require("./scripts/request-handlers.js");
const bodyParser = require("body-parser");

const app = express();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

app.use(express.json());
// app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));
app.use( bodyParser.json({limit: '50mb'}) );
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: false,
  }));
const upload = multer();
app.use(express.static("www"));

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("www"));

// Client
app.get("/clients", requestHandlers.getClients);

app.get("/clientById/:id", requestHandlers.getClientById);
// post Client
/** @todo Completar */
app.post("/client", requestHandlers.createUpdateCliente);

// put client
/** @todo Completar */
app.put("/client/:id", upload.any(), (req, res) => {
    let r = req.body.client;
    let clientData = JSON.parse(req.body.client);
    let destinationPath = path.join("clientImages",clientData.username+".jpg");
    req.files.length !=0 ? fs.writeFileSync(path.join("www", destinationPath), req.files[0].buffer) : console.log("Sem imagem.");
    res.json({"message": "success", "client":clientData.username});
}, requestHandlers.createUpdateCliente);

// app.post('/automoveis', upload.any(), (req, res) => {
//     let autData = JSON.parse(req.body.aut);
//     let destinationPath = path.join("serverImages",autData.modelo+".jpg");
//     let newAut = {id:automoveis.length+1,marca:autData.marca,modelo:autData.modelo,logo:destinationPath}
//     fs.writeFileSync(path.join("www", destinationPath), req.files[0].buffer);
//     automoveis.push(newAut);
//     res.json({"message": "success", "automovel":automoveis });
// });

// update client to inactive
app.put("/client/:id", requestHandlers.removeCliente);

// login
app.post("/postLogin/:username/:password", requestHandlers.postLogin);


app.listen(8082, function () {
    console.log("Server running at http://localhost:8082");
});