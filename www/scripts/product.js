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