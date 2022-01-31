"use strict";
const express = require("express");
const requestHandlers = require("./scripts/request-handlers.js");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("www"));

// Client
app.get("/clients", requestHandlers.getClients);

app.get("/clientById/:id", requestHandlers.getClientById);
// post Client
/** @todo Completar */
app.post("/client", requestHandlers.createUpdateCliente);

// put client
/** @todo Completar */
app.put("/client/:id", requestHandlers.createUpdateCliente);

// update client to inactive
app.put("/client/:id", requestHandlers.removeCliente);

// login
app.post("/postLogin/:username/:password", requestHandlers.postLogin);


app.listen(8082, function () {
    console.log("Server running at http://localhost:8082");
});