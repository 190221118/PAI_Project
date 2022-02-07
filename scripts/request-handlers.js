"use strict";

// Use of the mysql
const mysql = require("mysql");
const options = require("./connection-options.json");

// Creation of the querys for the CRUD functionalities
const queryClients = "SELECT clientId, clientName, clientUsername, DATE_FORMAT(clientBirthDate,'%Y-%m-%d') AS clientBirthDate, clientAddress, clientZipCode, clientDocument, clientEmail, clientGender, clientFone  FROM clients WHERE clientState ='A'";
const queryClient = "SELECT clientId, clientName, clientUsername, DATE_FORMAT(clientBirthDate,'%Y-%m-%d') AS clientBirthDate, clientAddress, clientZipCode, clientDocument, clientEmail, clientGender, clientFone  FROM clients WHERE clientState ='A' and clientId = ?";
const queryProducts = "SELECT p.productId,  p.productName,  p.productDescription, pc.productCategoryName,  p.productImg,  p.productPrice FROM products AS p INNER JOIN productcategories as pc on p.productCategoryId = pc.productCategoryId WHERE p.productIsEnabled = 1";
const queryProduct = "SELECT p.productId,  p.productName,  p.productDescription, pc.productCategoryName,  p.productImg,  p.productPrice FROM products AS p INNER JOIN productcategories as pc on p.productCategoryId = pc.productCategoryId WHERE p.productIsEnabled = 1 and p.productId = ?";
const queryCategories = "SELECT productCategoryId, productCategoryName FROM productcategories";

const sqlUpdateCliPass = "UPDATE clients SET clientName = ?, clientUsername = ?, clientAddress = ?, clientZipCode = ?, clientDocument = ?, clientEmail = ? , clientGender = ?,  clientFone = ?, clientBirthDate = ?, clientPassword = md5(?) WHERE clientId = ?";
const sqlUpdateCli = "UPDATE clients SET clientName = ?, clientUsername = ?, clientAddress = ?, clientZipCode = ?, clientDocument = ?, clientEmail = ? , clientGender = ?,  clientFone = ?, clientBirthDate = ? WHERE clientId = ?";

/**
 * Function to return the json message obtained from the connection to the database
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

/**
 * Function to create a connection to the database based on the selected query
 * 
 * @param {*} req - Variable with the request body
 * @param {*} res - Variable with the response
 * @param {*} query - Query to execute in the database
 * @param {*} typeColumn - To know which response to obtain in the getJsonMessage function
 */
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


/**
 * Function to get all clients
 * 
 * @param {*} req - Variable with the request body
 * @param {*} res - Variable with the response 
 */
function getClients(req, res) {
    createConnectionToDb(req, res, queryClients, "clients");
}

/**
 * Function to get only one client
 * 
 * @param {*} req - Variable with the request body
 * @param {*} res - Variable with the response
 */
function getClientById(req, res) {
    createConnectionToDb(req, res, queryClient, "client");
}

/**
 * Function to get all products
 * 
 * @param {*} req - Variable with the request body
 * @param {*} res - Variable with the response
 */
function getProducts(req, res) {
    createConnectionToDb(req, res, queryProducts, "products");
}

/**
 * Function to get only one product
 * 
 * @param {*} req - Variable with the request body
 * @param {*} res - Variable with the response
 */
function getProductById(req, res) {
    createConnectionToDb(req, res, queryProduct, "product");
}

/**
 * Function to get all categories
 * 
 * @param {*} req - Variable with the request body
 * @param {*} res - Variable with the response
 */
function getCategories(req, res) {
    createConnectionToDb(req, res, queryCategories, "categories");
}

/**
 * This function is used to update an existing client or create a new one based on the param "isUpdate"
 * 
 * @param {*} formClient - form with data about the client
 * @param {*} isUpdate - if the operation is to update or create a new data
 * @param {*} result - result from the execution of the query
 */
function createUpdateClient(formClient, isUpdate, result) {
    // Declaration of variables
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

    // Check if is update or not
    if (isUpdate) {
        if (password != null) {
            sqlUpdate = sqlUpdateCliPass;
        }
    }

    // If is update use the sqlUpdate query created above otherwise execute the insert query
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
            // Insertion of the data in the following params
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


/**
 * Function to remove (deactivate) a client from the database
 * 
 * @param {*} req - Variable with the request body
 * @param {*} res - Variable with the response 
 */
function removeClient(req, res) {
    // Query to set the state of an existing client to deactivated
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

/**
 * Function to login into the website using an existing user
 * 
 * @param {*} req - Variable with the request body
 * @param {*} res - Variable with the response
 */
function postLogin(req, res) {
    // Query to see if the login username and password match
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

/**
 * This function is used to update an existing product or create a new one based on the param "isUpdate"
 * 
 * @param {*} product - variable with all the data related to the product
 * @param {*} isUpdate - if the operation is to update or create a new data
 * @param {*} result - result from the execution of the query
 */
function createUpdateProduct(product, isUpdate, result) {
    // Declaration of variables
    let connection = mysql.createConnection(options);
    let id = product.id;
    let name = product.name;
    let description = product.description;
    let category = product.category;
    let image = product.image;
    let price = product.price;

    // If is update execute the update query otherwise execute the insert query
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
            // Insertion of the data in the following params
            connection.query(sql, [name, description, category, image, price, id], function (err, rows, results) {
                if (err) {
                    if (result != null) {
                        result(err, null, null);
                        console.log("erro aqui");
                    }
                    else {
                        console.log("erro aqui2");
                        throw err;
                    }
                } else {
                    console.log("sucesso aqui3");
                    result(err, rows, results);
                }
            });
        }
    });
}

/**
 * Function to remove (deactivate) a product from the database
 * 
 * @param {*} req - Variable with the request body
 * @param {*} res - Variable with the response 
 */
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

// Exports
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