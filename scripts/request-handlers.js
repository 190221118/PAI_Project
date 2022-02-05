"use strict";

const mysql = require("mysql");
const options = require("./connection-options.json");

const queryClients = "SELECT clientId, clientName, clientUsername, DATE_FORMAT(clientBirthDate,'%Y-%m-%d') AS clientBirthDate, clientAddress, clientZipCode, clientDocument, clientEmail, clientGender, clientFone  FROM clients WHERE clientState ='A'";
const queryClient = "SELECT clientId, clientName, clientUsername, DATE_FORMAT(clientBirthDate,'%Y-%m-%d') AS clientBirthDate, clientAddress, clientZipCode, clientDocument, clientEmail, clientGender, clientFone  FROM clients WHERE clientState ='A' and clientId = ?";
const queryProducts = "SELECT p.productId,  p.productName,  p.productDescription, pc.productCategoryName,  p.productImg,  p.productPrice FROM products AS p INNER JOIN productcategories as pc on p.productCategoryId = pc.productCategoryId WHERE p.productIsEnabled = 1";
const queryProduct = "SELECT p.productId,  p.productName,  p.productDescription, pc.productCategoryName,  p.productImg,  p.productPrice FROM products AS p INNER JOIN productcategories as pc on p.productCategoryId = pc.productCategoryId WHERE p.productIsEnabled = 1 and p.productId = ?";
const queryCategories = "SELECT productCategoryId, productCategoryName FROM productcategories";

const sqlUpdateCliPass = "UPDATE clients SET clientName = ?, clientUsername = ?, clientAddress = ?, clientZipCode = ?, clientDocument = ?, clientEmail = ? , clientGender = ?,  clientFone = ?, clientBirthDate = ?, clientPassword = md5(?) WHERE clientId = ?";
const sqlUpdateCli = "UPDATE clients SET clientName = ?, clientUsername = ?, clientAddress = ?, clientZipCode = ?, clientDocument = ?, clientEmail = ? , clientGender = ?,  clientFone = ?, clientBirthDate = ? WHERE clientId = ?";
/**
 * Função para retornar a lista de pessoas da BD.
 * @param {*} req 
 * @param {*} res 
 */

function getJsonMessage(err, rows, res, typeColumn) {
    if (err) {
        res.json({ "message": "error", "error": err });
    } else if (typeColumn === "categories") {
        res.json({ "message": "success", "category": rows });
    } else if (typeColumn === "clients" || typeColumn === "client") {
        res.json({ "message": "success", "client": rows });
    } else if (typeColumn === "products" || typeColumn === "product") {
        res.json({ "message": "success", "product": rows });
    }
}

function createConnectionToDb(req, res, query, typeColumn) {
    var connection = mysql.createConnection(options);
    connection.connect();

    if (typeColumn === "client" || typeColumn === "product") {
        connection.query(query, [req.params.id], function (err, rows) {
            getJsonMessage(err, rows, res, typeColumn);
        });
    }
    else {
        connection.query(query, function (err, rows) {
            getJsonMessage(err, rows, res, typeColumn);
        });
    }
}

// Secção dos gets

function getClients(req, res) {
    createConnectionToDb(req, res, queryClients, "clients");
}

function getClientById(req, res) {
    createConnectionToDb(req, res, queryClient, "client");
}

function getProducts(req, res) {
    createConnectionToDb(req, res, queryProducts, "products");
}

function getProductById(req, res) {
    createConnectionToDb(req, res, queryProduct, "product");
}

function getCategories(req, res) {
    createConnectionToDb(req, res, queryCategories, "categories");
}

function createUpdateClient(formClient, isUpdate, result) {
    /** @todo Completar */
    let connection = mysql.createConnection(options);
    let id = formClient.id;
    let name = formClient.name;
    let username = formClient.username;
    let address = formClient.address;
    let zipCode = formClient.zipCode;
    let documentId = formClient.documentId;
    let email = formClient.email;
    let gender = formClient.gender;
    let phone = formClient.phone;
    let birthdate = formClient.birthDate;

    let sqlUpdate = sqlUpdateCli;
    let password = formClient.password;

    if (isUpdate) {
        if (password != null) {
            sqlUpdate = sqlUpdateCliPass;
        }
    }

    let sql = (isUpdate) ? sqlUpdate : "INSERT INTO clients(clientName, clientUsername, clientAddress, clientZipCode, clientDocument, clientEmail, clientGender, clientFone, clientBirthDate, clientState, clientType, clientPassword) VALUES (?,?,?,?,?,?,?,?,?,'A','Client', md5(?))";
    connection.connect(function (err) {
        if (err) {
            if (result != null) {
                result(err, null, null);
            }
            else {
                throw err;
            }
        }
        else {
            let params = password != null ? [name, username, address, zipCode, documentId, email, gender, phone, birthdate, password, id] : [name, username, address, zipCode, documentId, email, gender, phone, birthdate, id];

            connection.query(sql, params, function (err, rows, results) {
                if (err) {
                    if (result != null) {
                        result(err, null, null);
                    }
                    else {
                        throw err;
                    }
                } else {
                    result(err, rows, results);
                }
            });
        }
    });
}


function removeClient(req, res) {

    let query = "UPDATE clients SET clientState ='I' WHERE clientId = ?";
    let connection = mysql.createConnection(options);

    connection.connect(function (err) {
        if (err) throw err;
        connection.query(query, [req.params.id], function (err, rows, results) {
            if (err) {
                res.sendStatus(500);
            } else {
                res.send({ "message": "success", "client": rows, "results": results });
            }
        });
    });
}

function postLogin(req, res) {

    var connection = mysql.createConnection(options);
    let sql = "SELECT count(1) AS retorno, clientId AS id , IFNULL(clientType,'Client') AS type FROM clients  WHERE clientUsername = ? AND clientPassword = MD5(?) AND clientState <> 'I'";

    connection.connect(function (err) {
        if (err) throw err;

        let username = req.params.username;
        let password = req.params.password;

        connection.query(sql, [username, password], function (err, rows, results) {
            if (err) {
                res.sendStatus(500);
            } else {
                res.send({ "message": "success", "login": rows, "results": results });
            }
        });
    });
}

function createUpdateProduct(product, isUpdate, result) {
    let connection = mysql.createConnection(options);
    let id = product.id;
    let name = product.name;
    let description = product.description;
    let category = product.category;
    let image = product.image;
    let price = product.price;

    let sql = (isUpdate) ? "UPDATE products SET productName = ?, productDescription = ?, productCategoryId = ? , productImg = ? , productPrice = ? WHERE productId = ?" : "INSERT INTO products(productName, productDescription, productCategoryId, productImg, productPrice, productIsEnabled) VALUES (?,?,?,?,?,1)";
    connection.connect(function (err) {
        if (err) {
            if (result != null) {
                result(err, null, null);
            }
            else {
                throw err;
            }
        }
        else {
            connection.query(sql, [name, description, category, image, price, id], function (err, rows, results) {
                if (err) {
                    if (result != null) {
                        result(err, null, null);
                        console.log("entrou aqui");
                    }
                    else {
                        console.log("entrou aqui2");
                        throw err;
                    }
                } else {
                    console.log("entrou aqui3");
                    result(err, rows, results);
                }
            });
        }
    });
}

function removeProduct(req, res) {

    let query = 'UPDATE products SET productIsEnabled = 0 WHERE productId = ?';
    let connection = mysql.createConnection(options);

    connection.connect(function (err) {
        if (err) throw err;
        connection.query(query, [req.params.id], function (err, rows, results) {
            if (err) {
                res.sendStatus(500);
            } else {
                res.send({ "message": "success", "product": rows, "results": results });
            }
        });
    });
}

// module.exports.getClients = getClients;
// module.exports.getClientById = getClientById;
// module.exports.createUpdateCliente = createUpdateCliente;
// module.exports.removeCliente = removeCliente;
// module.exports.postLogin = postLogin;
// module.exports.getProducts = getProducts;
// module.exports.getCategories = getCategories;
// module.exports.createUpdateProduct = createUpdateProduct;
// module.exports.removeProduct = removeProduct;

module.exports = {
    getClients: getClients,
    getClientById: getClientById,
    getProductById: getProductById,
    createUpdateClient: createUpdateClient,
    removeClient: removeClient,
    postLogin: postLogin,
    getProducts: getProducts,
    getCategories: getCategories,
    createUpdateProduct: createUpdateProduct,
    removeProduct: removeProduct
}