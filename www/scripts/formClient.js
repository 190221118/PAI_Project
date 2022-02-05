"use strict";

/** 
* @class Estrutura com capacidade de armazenar o cliente
* @constructs FormClient
* @param {int} id - id do cliente
* @param {string} name - nome do cliente
  @param {string} username - username do cliente
  @param {string} password - nome do cliente
* @param {Date} birthDate - data de nascimento da pessoa
  @param {string} address - morada do cliente
  @param {string} zipCode - cod postal do cliente
  @param {string} documentId - documento do cliente
  @param {string} email - email do cliente
  @param {string} gender - sexo do cliente
  @param {string} phone - fone do cliente
*/
class FormClient {
    constructor(id, name, username, password, birthDate, address, zipCode, documentId, email, gender, phone) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.password = password;
        this.birthDate = birthDate;
        this.address = address;
        this.zipCode = zipCode;
        this.documentId = documentId;
        this.email = email;
        this.gender = gender;
        this.phone = phone;
    }
}