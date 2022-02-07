"use strict";

/** 
* @class  Saves all the information about the product
* @constructs 
* @param {string} id - id of the HTML element that contains the information.
* 
* @property {string} id - id of the HTML element that contains the information.
* @property {product[]} products - Array of objects of the type products,
  @property {categories[]} categories - Array of objects of the type categories
  @property {int} countproducts - counter of products
*/
class InformationProducts {
    constructor(id) {
        this.id = id;
        this.products = [];
        this.categories = [];
        this.countproducts = 0;
    }
    
    /**
     * Function to show the homepage
     */
    showHome() {
        /** Update the title */
        document.getElementById("headerTitle").textContent="Home";

        /** Clear the content */
        document.getElementById("divInformation").style.display="none";    
        document.getElementById("formClient").style.display = "none";
        document.getElementById("formProduct").style.display = "none";
        document.getElementById("catalogProducts").style.display = "none";
        if (sessionStorageObter("username_login") === null) {
                document.getElementById("formLogin").style.display = "block";
                document.getElementById("menuLogin").style.display = "none";
        }
        else {
                document.getElementById("formLogin").style.display = "none";
                document.getElementById("menuLogin").style.display = "block";

                let cleanDiv= document.createElement("div");
                replaceChilds("divProductList",cleanDiv);

                document.getElementById("divProductList").style.display = "block";
                document.getElementById("demo").style.display = "block";
                
                let p = JSON.parse(localStorage.getItem("products"));
                if (p != null){
                    for (var i=0; i <= p.length-1; i++){
                    addDiv(p[i].productCategoryName, p[i].productName, p[i].productImg, [i]);
                }
           
        }
        }
    }
    
    /**
     * Show the products table
     * 
     * @param {*} acao - if is delete, insert or update
     */
    showProducts(acao) {
        let self = this;
        let type = localStorageObter("type");

        if (acao === "select") {
            infoProducts.getProducts();
        }
        
        document.getElementById("headerTitle").textContent="Products";
    
        document.getElementById("formClient").style.display = "none";
        //document.getElementById("formProduct").style.display = "none";
        document.getElementById("formLogin").style.display = "none"; 
        document.getElementById("divProductList").style.display = "none";
        document.getElementById("divInformation").style.display = "block";
        document.getElementById("demo").style.display = "none";

        document.getElementById("catalogProducts").style.display = "block";

        let cleanDiv= document.createElement("div");
        replaceChilds("divInformation",cleanDiv);

        if (type === "Admin"){
            let productTable = document.createElement("table");
            productTable.setAttribute("id", "productTable");
            let th = tableLine(new Product(),true);
            productTable.appendChild(th);
            this.products.forEach(p=>{
                let tr = tableLine(p);
                productTable.appendChild(tr);
            });
            replaceChilds("divInformation",productTable);

            var table = document.getElementById("productTable");
            var rows = table.getElementsByTagName("tr");

            for(var i = 0; i < rows.length; i++){
                var row = rows[i];

                row.addEventListener("click", function(){
                //Add to the current
                selLinha(this, false); //Select only one
                //selLinha(this, true); //Select multiple
                });
            }
            
            // Show content
            
            /**
             * Function to handle the delete event
             */
            function deleteProductEventHandler() {
                document.getElementById('formProduct').style.display = "none";
                document.getElementById('deleteProduct').style.display = "block";
                document.getElementById('deleteProduct').action = 'javascript:infoProducts.processingProduct("delete");';
                document.getElementById("productModalTitle").innerHTML = "Delete Product";
                loadProduct("delete");
            }

            /**
             * Function to handle the insert event
             */
            function newProductEventHandler() {
                document.getElementById('formProduct').style.display = "block";
                document.getElementById('deleteProduct').style.display = "none";
                document.getElementById('formProduct').action = 'javascript:infoProducts.processingProduct("create");';
                document.getElementById("productModalTitle").innerHTML = "New Product";
                const button = document.getElementById('insertNew');
                button.setAttribute('data-bs-toggle', 'modal');
                button.setAttribute('data-bs-target', '#myModal2');
                setupForm();
            }

            /**
             * Function to handle the update event
             */
            function updateProductEventHandler() {
                document.getElementById('formProduct').style.display = "block";
                document.getElementById('deleteProduct').style.display = "none";
                document.getElementById('formProduct').action = 'javascript:infoProducts.processingProduct("update");';
                document.getElementById("productModalTitle").innerHTML = "Update Product";
                const button = document.getElementById('updateData');
                button.setAttribute('data-bs-toggle', 'modal');
                button.setAttribute('data-bs-target', '#myModal2');
                cleanCanvasProduct();
                loadProduct("update");
            }

            /**
             * Function to set up the product's form
             */
            function setupForm(){
                document.getElementById('formProduct').style.display = 'block';
                document.getElementById('formProduct').reset();
                document.getElementById('imageProduct').value = "";
                //document.getElementById('formClient').innerHTML = '';
                document.getElementById('categoryProduct').options.length = 0;

                self.categories.forEach ( (e) => {
                    document.getElementById('categoryProduct').options.add(new Option(e.productCategoryName));
                });
            }

            /**
             * Function to load a product's information into a form
             * 
             * @param {*} type 
             */
            function loadProduct(type){
                document.getElementById('formProduct').reset();
                document.getElementById('formClient').reset();
                document.getElementById('categoryProduct').options.length = 0;

                self.categories.forEach ( (e) => {
                    document.getElementById('categoryProduct').options.add(new Option(e.productCategoryName));
                });

                if(type === "delete"){
                    if (selected(document.getElementById("productTable"), "products", "delete"))
                    document.getElementById('formProduct').style.display = 'none';
                }
                else if(type === "update"){
                    if (selected(document.getElementById("productTable"), "products", "update"))
                    document.getElementById('formProduct').style.display = 'block';
                }
                
            }
            
            var divButtons = document.createElement('div');
            divButtons.id = 'divButtons';
            document.getElementById("divInformation").appendChild(divButtons);

            createButton("divButtons", updateProductEventHandler, 'Update Product');
            //let type = localStorageObter("type");
            if (type === "Admin") {
                createButton("divButtons", newProductEventHandler, 'New Product');
                createButton("divButtons", deleteProductEventHandler, 'Delete Product');
                //createButton("divInformation", selectAllClientEventHandler, 'Select All');
            }
        }
        else {
            if(self.countproducts === 0){
                
                replaceChilds("divInformation",cleanDiv);
                document.getElementById("demo").style.display = "none";
                
                let p = JSON.parse(localStorage.getItem("products"));
                if (p != null){
                    for (var i=0; i <= p.length-1; i++){
                        addCatalogDiv(p[i].productCategoryName, p[i].productName, p[i].productImg, [i]);
                    }
                }
            }
        }
        self.countproducts++;
    }
    
    /**
     * Function that has as main goal to request to the NODE.JS server the product resource through the GET verb, using asynchronous requests and JSON
     */
    getProducts() {
        const self = this;
        let products = this.products;
        products.length = 0;
        var tableElement = document.getElementById("productTable");
        tableElement = document.createElement("table");
        tableElement.setAttribute("id", "productTable");

        var xhr = new XMLHttpRequest();
        xhr.responseType="json";
        xhr.open("GET", "/products", true);
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let info = xhr.response.product;
                info.forEach(p => {
                    products.push(p);
                });
                localStorageGravar("products",JSON.stringify(products));
                self.showProducts("selectAll");
            }
        };
        xhr.send(tableElement);
    }

    /**
     * Function that has as main goal to request to the NODE.JS server the resource product by id through the GET verb, using asynchronous requests and JSON
     * 
     * @param {*} id 
     */
    getProductById(id) {
        const self = this;
        var tableElement = document.getElementById("productTable");
        tableElement = document.createElement("table");
        tableElement.setAttribute("id", "productTable");

        let products = this.products;
        products.length = 0;
        var xhr = new XMLHttpRequest();
        xhr.responseType="json";
        xhr.open('GET', '/productById/' + id, true);
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let info = xhr.response.product;
                info.forEach(p => {
                    products.push(p);
                });
                localStorageGravar("products",JSON.stringify(products));
                self.showProducts("selectById");
            }
        };
        xhr.send(tableElement);
    }

    /**
     * Function that has as main goal to request to the NODE.JS server the resource categpru by id through the GET verb, using asynchronous requests and JSON
     */
    getCategories() {
        let categories = this.categories;
        categories.length = 0;
        var xhr = new XMLHttpRequest();
        xhr.responseType="json";
        xhr.open("GET", "/productcategories", true);
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let info = xhr.response.category;
                info.forEach(c => {
                    categories.push(c);
                });
            }
        };
        xhr.send();
    }

    /**
     * Function that inserts or updates the resource person with a request to the NODE.JS server through the POST or PUT verb, using asynchronous requests and JSON
     * @param {String} acao - controls which CRUD operation we want to do
     */
    processingProduct (acao) {
        const id = parseInt(document.getElementById('idProduct').value);
        const name = document.getElementById('nameProduct').value;
        const description = document.getElementById('descriptionProduct').value;
        const category = document.getElementById('categoryProduct').value;
        const image = document.getElementById("imageProduct").value;
        const price = document.getElementById('priceProduct').value;

        let args = [];
        args.push(name);
        args.push(description);
        args.push(category);
        args.push(price);

        const product = new Product(id, name,description, category, image, price);
        if (acao === 'create') {
            args.push(image);
            if (validadeForm(args)){
                this.putProduct(product, false);
            } 
        } else if (acao === 'update') {
            if (validadeForm(args)){
                this.putProduct(product, true);
            }
            
        } else if (acao === 'delete') {
            this.deleteProduct(product);
        }
    }

    /**
     * Function to update or insert a new product
     * 
     * @param {*} product - product's form with all the information
     * @param {*} isUpdate - if the action is update or insert
     */
    putProduct(product, isUpdate){
        const self = this;
        let formData = new FormData();
        let categoryId = 0;

        self.categories.forEach ( (e) => {
            if(e.productCategoryName === product.category)
                categoryId = e.productCategoryId;
        });

        let f = document.getElementById("imageProduct").files[0];
        formData.append('file', document.getElementById("imageProduct").files[0]);
        formData.append('product', JSON.stringify({id: product.id, name:product.name,description:product.description, category: categoryId, image:f, price:product.price}));

        const xhr = new XMLHttpRequest();
        xhr.responseType="json";
        xhr.open('PUT', '/products/' + product.id);
        
        xhr.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                //hself.clients[self.clients.findIndex(i => i.id === client.id)] = client;
                if(!isUpdate){
                    let id = xhr.response.product.insertId;
                    self.getProductById(id);
                    self.showProducts("insert");
                }
                else{
                    self.getProductById(product.id);
                    self.showProducts("update");
                }
            }
        }
        //xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(formData);
    }
    
    /**
     * Function to delete an existing product
     * 
     * @param {*} product - product's form with all the information
     */
    deleteProduct(product){
        const self = this;
        const xhr = new XMLHttpRequest();
        xhr.open('DELETE', '/products/' + product.id);
        xhr.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                self.products.splice(self.products.findIndex(i => i.productId === product.id), 1);
                self.showProducts("delete");
            }
        };
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(product));
    }
}