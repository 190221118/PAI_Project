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
    var query = "SELECT clientId, clientName, clientUsername, clientPassword, clientBirthDate, clientAddress, clientZipCode, clientDocument, clientEmail, clientGender, clientFone  FROM clients";
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({"message": "error", "error": err });
        } else {
            res.json({"message": "success", "client": rows });
        }
    });
}
module.exports.getClients = getClients;

function getPeople(req, res) {
    var connection = mysql.createConnection(options);
    connection.connect();
    var query = "SELECT id, name, birthDate, idCountry FROM person";
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({"message": "error", "error": err });
        } else {
            res.json({"message": "success", "person": rows });
        }
    });
}
module.exports.getPeople = getPeople;

/**
 * Função para retornar a lista de países da BD.
 * @param {*} req 
 * @param {*} res 
 */
function getCountries(req, res) {
    /** @todo Completar */
    var connection = mysql.createConnection(options);
    connection.connect();
    var query = "SELECT id, name, shortname FROM country";
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({"message": "error", "error": err });
        } else {
            res.json({"message": "success", "country": rows });
        }
    });
}
module.exports.getCountries = getCountries;

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
    let sql = (req.method === 'PUT') ? "UPDATE clients SET clientName = ?, clientPassword = ?, clientBirthDate = ? , clientAddress = ? , clientZipCode = ? , clientDocument = ? , clientEmail = ? , clientGender = ? WHERE clientId = ?" : "INSERT INTO clients(clientName, clientUsername, clientPassword, clientAddress, clientZipCode, clientDocument, clientEmail, clientGender, clientFone, clientBirthDate) VALUES (?,?,md5(?),?,?,?,?,?,?,?)";
    connection.connect(function (err) {
        if (err) throw err;
    let password = req.body.password;
    //clientId, clientName, clientUsername, clientPassword, clientAddress,clientZipCode,clientDocument,clientEmail,clientGender,clientFone,birthDate
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

function createUpdatePerson(req, res) {
    /** @todo Completar */
    let connection = mysql.createConnection(options);
    let name = req.body.name;
    let birthday = req.body.birthDate;
    let idCountry = req.body.idCountry;
    let sql = (req.method === 'PUT') ? "UPDATE person SET name = ?, birthdate = ? , idCountry = ? WHERE id = ?" : "INSERT INTO person(name, birthdate, idCountry) VALUES (?,?,?)";
    connection.connect(function (err) {
        if (err) throw err;
        connection.query(sql, [name, birthday, idCountry, req.params.id], function (err, rows) {
            if (err) {
                res.sendStatus(500);
            } else {
                res.send(rows);
            }
        });
    });
}
module.exports.createUpdatePerson = createUpdatePerson;

function removePerson(req, res) {
    let query = 'DELETE FROM person WHERE id = ?';
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

module.exports.removePerson = removePerson;
