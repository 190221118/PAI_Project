/* 
 * Copyright (C) 1883 Thomas Edison - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the XYZ license, which unfortunately won't be
 * written for another century.
 *
 * You should have received a copy of the XYZ license with
 * this file. If not, please write to: , or visit :
 * 
 * Authors: Nicole Vieira (201700124) and Yasmin Hage (202100778)
 */

"use strict";

// Use express
const express = require("express");
// Use request handles
const requestHandlers = require("./scripts/request-handlers.js");
// Use body parser
const bodyParser = require("body-parser");

const app = express();
// Use multer
const multer = require('multer');
// Use path
const path = require('path');
// Use fs
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

// Client's section

// Calls a function to get all clients
app.get("/clients", requestHandlers.getClients);

// Calls a function to get a client by his id
app.get("/clientById/:id", requestHandlers.getClientById);

// Call a function to update or create a new client
app.put("/clients/:id", upload.any(), (req, res) => {
    let r = req.body.formClient;
    let clientData = JSON.parse(req.body.formClient);
    let pass = clientData.password.trim().length;
    let cli = clientData.password.trim().length != 0 ?
            {  name: clientData.name ,
               username:clientData.username,
               birthDate:clientData.birthDate,
               password:clientData.password,
               address:clientData.address,
               zipCode:clientData.zipCode,
               documentId:clientData.documentId,
               email:clientData.email,
               gender:clientData.gender,
               phone:clientData.phone,
               id: clientData.id
            } :{
               name: clientData.name ,
               username:clientData.username,
               birthDate:clientData.birthDate,
               address:clientData.address,
               zipCode:clientData.zipCode,
               documentId:clientData.documentId,
               email:clientData.email,
               gender:clientData.gender,
               phone:clientData.phone,
               id: clientData.id
            };
    requestHandlers.createUpdateClient(cli, cli.id !== null ? true : false, (err, rows, results) => {
        if (err) {
            console.log(err);

            res.status(500).json({"message": "error"});
        } else {
            res.status(200).json({"message": "success", "client": rows, "results":results });
        }

    })
});

// Calls a function to remove a client
app.delete("/clients/:id", requestHandlers.removeClient);

// Calls a function to login into the website
app.post("/postLogin/:username/:password", requestHandlers.postLogin);


// Product section

// Calls a function to get all products
app.get("/products", requestHandlers.getProducts);

// Calls a function to a product by his id
app.get("/productById/:id", requestHandlers.getProductById);

// Calls a function to get all categories
app.get("/productcategories", requestHandlers.getCategories);

// Calls a function to updte or create a new product
app.put("/products/:id", upload.any(), (req, res) => {
    let r = req.body.product;
    let productData = JSON.parse(req.body.product);

    let destinationPath = path.join("productsImages",productData.name+".jpg");
    req.files.length !=0 ? fs.writeFileSync(path.join("www", destinationPath), req.files[0].buffer) : console.log("Sem imagem.");
    
    let prod = req.files.length !=0 || destinationPath.length !=0 ? 
                                        {name: productData.name ,
                                        description:productData.description,
                                        category:productData.category,
                                        price:productData.price,
                                        image: destinationPath,
                                        id: productData.id
                                        }:{
                                        name: productData.name ,
                                        description:productData.description,
                                        category:productData.category,
                                        price:productData.price,
                                        id: productData.id
                                        };
    requestHandlers.createUpdateProduct(prod, prod.id !== null ? true : false, (err, rows, results) => {
        if (err) {
            console.log(err);

            res.status(500).json({"message": "error"});
        } else {
            res.status(200).json({"message": "success", "product": rows, "results":results });
        }

    })
});

// Calls a function to remove a product
app.delete("/products/:id", requestHandlers.removeProduct);


app.listen(8082, function () {
    console.log("Server running at http://localhost:8082");
});