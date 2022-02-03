"use strict";

/** 
* @class  
* @constructs 
* @param {string} id - id do elemento HTML que contém a informação.
* 
* @property {string} id - id do elemento HTML que contém a informação.
* @property {product[]} products - Array de objetos do tipo products,
  @property {categories[]} categories - Array de objetos do tipo ,categories
*/
class InformationProducts {
    constructor(id) {
        this.id = id;
        this.products = [];
        this.categories = [];
    }
    /**
     * coloca a palavra "home" no div titulo e limpa o div informação
     */
    showHome() {
        /** Actualizar o título */
        document.getElementById("headerTitle").textContent="Home";

        /** Limpar o conteúdo */
        document.getElementById("divInformation").style.display="none";    
        document.getElementById("formClient").style.display = "none";
        document.getElementById("formProduct").style.display = "none";
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
                
                let p = JSON.parse(localStorage.getItem("products"));
                if (p != null){
                    for (var i=0; i <= p.length-1; i++){
                    addDiv(p[i].productCategoryName, p[i].productName, p[i].productImg);
                }
           
        }
        }
    }
    /**
     * coloca a palavra "Client" no div titulo e cria dinamicamente uma tabela com a informação dos clientes
     */
    showProducts(acao) {
        let self = this;
        let type = localStorageObter("type");

        if (acao === "insert" || acao === "update" || acao === "delete") {
            infoProducts.getProducts();
        }
        
        /** Actualizar o título */
        document.getElementById("headerTitle").textContent="Products";

        document.getElementById("formClient").style.display = "none";
        document.getElementById("formProduct").style.display = "none";
        document.getElementById("formLogin").style.display = "none"; 
        document.getElementById("divProductList").style.display = "none";

        let cleanDiv= document.createElement("div");
        replaceChilds("divInformation",cleanDiv);

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
            //Adicionar ao atual
            selLinha(this, false); //Selecione apenas um
            //selLinha(this, true); //Selecione quantos quiser
            });
        }
        
        /** Mostrar o conteúdo */
        
        function deleteProductEventHandler() {
            document.getElementById('formProduct').action = 'javascript:infoProducts.processingProduct("delete");';
            loadProduct();
        }

        function newProductEventHandler() {
            document.getElementById('formProduct').action = 'javascript:infoProducts.processingProduct("create");';
            setupForm();
        }

        function updateProductEventHandler() {
            document.getElementById('formProduct').action = 'javascript:infoProducts.processingProduct("update");';
            cleanCanvasClient();
            cleanCanvasProduct();
            loadProduct();
        }

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

        function loadProduct(){
            document.getElementById('formProduct').reset();
            document.getElementById('formClient').reset();
            document.getElementById('categoryProduct').options.length = 0;

            self.categories.forEach ( (e) => {
                document.getElementById('categoryProduct').options.add(new Option(e.productCategoryName));
            });
            if (selected(document.getElementById("productTable"), "products"))
            document.getElementById('formProduct').style.display = 'block';
            
        }
        
        createButton("divInformation", updateProductEventHandler, 'Update Product');
        //let type = localStorageObter("type");
        if (type === "Admin") {
            createButton("divInformation", newProductEventHandler, 'New Product');
            createButton("divInformation", deleteProductEventHandler, 'Delete Product');
            //createButton("divInformation", selectAllClientEventHandler, 'Select All');
        }
    }
    /**
     * Função que que tem como principal objetivo solicitar ao servidor NODE.JS o recurso client através do verbo GET, usando pedidos assincronos e JSON
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
     * Função que que tem como principal objetivo solicitar ao servidor NODE.JS o recurso client por id através do verbo GET, usando pedidos assincronos e JSON
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
     * Função que insere ou atualiza o recurso pessoa com um pedido ao servidor NODE.JS através do verbo POST ou PUT, usando pedidos assincronos e JSON
     * @param {String} acao - controla qual a operação do CRUD queremos fazer
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
        args.push(image);
        args.push(price);

        const product = new Product(id, name,description, category, image, price);
        if (acao === 'create') {
            if (validadeForm(args)){
                this.putProduct(product, false);
            } 
        } else if (acao === 'update') {
            this.putProduct(product, true);
            
        } else if (acao === 'delete') {
            this.deleteProduct(product);
        }
    }

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