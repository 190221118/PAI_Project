"use strict";

/**
 * @class Estrutura com capacidade de armazenar o produto
 * @constructs Produto
 * @param {int} id - id do produto
 * @param {string} name - nome do produto
 * @param {string} description - descrição do produto
 * @param {int} category - id da categoria do produto
 * @param {string} image - imagem do produto
 * @param {float} price - preço do produto
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