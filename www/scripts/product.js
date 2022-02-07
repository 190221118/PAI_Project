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
 * @class Structure with capacity to store the product
 * @constructs Product
 * @param {int} id - product's id
 * @param {string} name - product's name
 * @param {string} description - product's description
 * @param {int} category - product's category id
 * @param {string} image - product's image
 * @param {float} price - product's price
 */
class Product {
    constructor(id, name, description, category, image, price) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.image = image;
        this.price = price;
    }
}