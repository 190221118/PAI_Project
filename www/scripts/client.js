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

/** 
* @class Structure with capacity to store the client
* @constructs Client
* @param {int} id - client's id
* @param {string} name - client's name
  @param {string} username - client's username
* @param {Date} birthDate - client's birthdate
  @param {string} address - client's address
  @param {string} zipCode - client's zipcode
  @param {string} documentId - client's document id
  @param {string} email - client's email
  @param {string} gender - client's gender
  @param {string} phone - client's phone number
*/
class Client {
    constructor(id, name, username, birthDate, address, zipCode, documentId, email, gender, phone) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.birthDate = birthDate;
        this.address = address;
        this.zipCode = zipCode;
        this.documentId = documentId;
        this.email = email;
        this.gender = gender;
        this.phone = phone;
    }
}