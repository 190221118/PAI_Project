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

// Secção do cliente

// Chama a função para ir buscar todos os clientes
app.get("/clients", requestHandlers.getClients);

// Chama a função para ir buscar um cliente pelo seu id
app.get("/clientById/:id", requestHandlers.getClientById);

// Chama a função para atualizar um cliente ou criar um novo
app.put("/clients/:id", upload.any(), (req, res) => {
    let r = req.body.client;
    let clientData = JSON.parse(req.body.client);
    let cli = {name: clientData.name ,
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

// Chama a função para remover um cliente
app.delete("/clients/:id", requestHandlers.removeClient);

// Chama a função para fazer login
app.post("/postLogin/:username/:password", requestHandlers.postLogin);


// Secção do produto

// Chama a função para ir buscar todos os produtos
app.get("/products", requestHandlers.getProducts);

// Chama a função para ir buscar um cliente pelo seu id
app.get("/productById/:id", requestHandlers.getProductById);

// Chama a função para ir buscar todas as categorias de produtos
app.get("/productcategories", requestHandlers.getCategories);

// Chama a função para criar um novo produto
app.put("/products/:id", upload.any(), (req, res) => {
    let r = req.body.product;
    let productData = JSON.parse(req.body.product);

    let destinationPath = path.join("productsImages",productData.name+".jpg");
    req.files.length !=0 ? fs.writeFileSync(path.join("www", destinationPath), req.files[0].buffer) : console.log("Sem imagem.");
    
    let prod = req.files.length !=0 ? {name: productData.name ,
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

// Chama a função para remover um produto
app.delete("/products/:id", requestHandlers.removeProduct);


app.listen(8082, function () {
    console.log("Server running at http://localhost:8082");
});