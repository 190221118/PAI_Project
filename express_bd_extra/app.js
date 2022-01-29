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

// People
//app.get("/person", requestHandlers.getPeople);

// Countries
/** @todo Completar */
app.get("/country", requestHandlers.getCountries);


// post Client
/** @todo Completar */
app.post("/client", requestHandlers.createUpdateCliente);

// put Person
/** @todo Completar */
app.put("/client/:id", requestHandlers.createUpdateCliente);

// delete Person
app.delete("/person/:id", requestHandlers.removePerson);



app.listen(8081, function () {
    console.log("Server running at http://localhost:8081");
});