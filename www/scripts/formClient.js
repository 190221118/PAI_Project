"use strict";

/** 
* @class Structure with capacity to store the client
* @constructs FormClient
* @param {int} id - client's id
* @param {string} name - client's name
  @param {string} username - client's username
  @param {string} password - client's password
* @param {Date} birthDate - client's birthdate
  @param {string} address - client's address
  @param {string} zipCode - client's zipcode
  @param {string} documentId - client's document id
  @param {string} email - client's email
  @param {string} gender - client's gender
  @param {string} phone - client's phone number
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