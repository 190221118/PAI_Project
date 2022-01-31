"use strict";
const mysql = require("mysql");
const options = require("./connection-options.json");
/**
 * Função para retornar a lista de pessoas da BD.
 * @param {*} req 
 * @param {*} res 
 */

function getClients(req, res) {
    var connection = mysql.createConnection(options);
    connection.connect();
    var query = "SELECT clientId, clientName, clientUsername, clientPassword, DATE_FORMAT(clientBirthDate,'%Y-%m-%d') AS clientBirthDate, clientAddress, clientZipCode, clientDocument, clientEmail, clientGender, clientFone  FROM clients WHERE clientState ='A'";
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({"message": "error", "error": err });
        } else {
            res.json({"message": "success", "client": rows });
        }
    });
}
module.exports.getClients = getClients;

function getClientById(req, res) {
    var connection = mysql.createConnection(options);
    connection.connect();
    var query = "SELECT clientId, clientName, clientUsername, clientPassword, DATE_FORMAT(clientBirthDate,'%Y-%m-%d') AS clientBirthDate, clientAddress, clientZipCode, clientDocument, clientEmail, clientGender, clientFone  FROM clients WHERE clientState ='A' and clientId = ?";
    connection.query(query, [req.params.id], function (err, rows) {
        if (err) {
            res.json({"message": "error", "error": err });
        } else {
            res.json({"message": "success", "client": rows });
        }
    });
}
module.exports.getClientById = getClientById;

/**
 * Função para criar ou atualizar clientes da BD.
 * @param {*} req 
 * @param {*} res 
 */
function createUpdateCliente(req, res) {
    /** @todo Completar */
    let connection = mysql.createConnection(options);
    let name = req.body.name;
    let username = req.body.username;
    let address = req.body.address;
    let zipCode = req.body.zipCode;
    let documentId = req.body.documentId;
    let email = req.body.email;
    let gender = req.body.gender;
    let phone = req.body.phone;
    let birthdate = req.body.birthDate;
    let sql = (req.method === 'PUT') ? "UPDATE clients SET clientName = ?, clientUsername = ?, clientPassword = md5(?), clientAddress = ?, clientZipCode = ?, clientDocument = ?, clientEmail = ? , clientGender = ?,  clientFone = ?, clientBirthDate = ? WHERE clientId = ?" : "INSERT INTO clients(clientName, clientUsername, clientPassword, clientAddress, clientZipCode, clientDocument, clientEmail, clientGender, clientFone, clientBirthDate, clientState) VALUES (?,?,md5(?),?,?,?,?,?,?,?,'A')";
    connection.connect(function (err) {
        if (err) throw err;
    let password = req.body.password;
    connection.query(sql, [ name, username, password, address, zipCode, documentId, email, gender, phone, birthdate, req.params.id], function (err, rows) {
            if (err) {
                res.sendStatus(500);
            } else {
                res.send(rows);
            }
        });
    });
}
module.exports.createUpdateCliente = createUpdateCliente;


function removeCliente(req, res) {
    let query = "UPDATE clients SET clientState ='I' WHERE id = ?";
    let connection = mysql.createConnection(options);
    connection.connect(function (err) {
        if (err) throw err;
        connection.query(query, [req.params.id], function (err) {
            if (err) {
                res.sendStatus(404);
            } else {
                res.sendStatus(200);
            }
        });
    });
}

module.exports.removeCliente = removeCliente;

function postLogin(req, res) {

    var connection = mysql.createConnection(options);
    let sql = "SELECT count(1) AS retorno, clientId AS id FROM clients  WHERE clientUsername = ? AND clientPassword = MD5(?)";

    connection.connect(function (err) {
        if (err) throw err;

    let username = req.params.username;
    let password = req.params.password;

    connection.query(sql, [ username, password], function (err, rows, results) {
            if (err) {
                res.sendStatus(500);
            } else {
                res.send({"message": "success", "login": rows, "results":results} );
            }
        });
    });
}

module.exports.postLogin = postLogin;
