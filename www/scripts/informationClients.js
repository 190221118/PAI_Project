"use strict";

/** 
* @class Guarda toda informação necessaria na execução do exercicio 
* @constructs InformationClients
* @param {string} id - id do elemento HTML que contém a informação.
* 
* @property {string} id - id do elemento HTML que contém a informação.
* @property {client[]} clients - Array de objetos do tipo client, para guardar todas as pessoas do nosso sistema
  @property {string[]} genders - Array de objetos do tipo gender, para guardar todas as pessoas do nosso sistema
*/
class InformationClients {
    constructor(id) {
        this.id = id;
        this.clients = [];
        this.genders = ['F','M'];
    }
    /**
     * coloca a palavra "home" no div titulo e limpa o div informação
     */
    showHome() {
        /** @todo Completar */
         /** @todo Tarefa 1 */
        /** Actualizar o título */
        document.getElementById("headerTitle").textContent="Home";

        /** @todo Tarefa 2 */
        /** Limpar o conteúdo */
        document.getElementById("divInformation").style.display="none";    
        document.getElementById("formClient").style.display = "none";
        if (sessionStorageObter("username_login") === null) {
                document.getElementById("formLogin").style.display = "block";
                document.getElementById("menuLogin").style.display = "none";
        }
        else {
                document.getElementById("formLogin").style.display = "none";
                document.getElementById("menuLogin").style.display = "block";
        }
    }
    /**
     * coloca a palavra "Client" no div titulo e cria dinamicamente uma tabela com a informação dos clientes
     */
     showClients(acao) {
        let self = this;
        let type = localStorageObter("type");
        
        // permissao para ver todos os clientes
        if (type === "Admin" && acao === "select") {
            infoClients.getClients();
        }
        /** Actualizar o título */
        document.getElementById("headerTitle").textContent="Clients";
        if (sessionStorageObter("username_login")  === null) {
            document.getElementById("divInformation").style.display="none";
            return;
        }
        else {
            document.getElementById("divInformation").style.display="block";
        }
        document.getElementById("formClient").style.display = "none";
        document.getElementById("formLogin").style.display = "none"; 

        let cleanDiv= document.createElement("div");
        replaceChilds("divInformation",cleanDiv);

        let clientTable = document.createElement("table");
        clientTable.setAttribute("id", "clientTable");
        let th = tableLine(new Client(),true);
        clientTable.appendChild(th);
        this.clients.forEach(p=>{
            let tr = tableLine(p);
            clientTable.appendChild(tr);
        });
        replaceChilds("divInformation",clientTable);

        var table = document.getElementById("clientTable");
        var rows = table.getElementsByTagName("tr");

        for(var i = 0; i < rows.length; i++){
            var row = rows[i];

            row.addEventListener("click", function(){
            //Adicionar ao atual
            selLinha(this, false); //Selecione apenas um
            //selLinha(this, true); //Selecione quantos quiser
            });
        }

        /** @todo Tarefa 2 */
        /** Mostrar o conteúdo */
        
        function deleteClientEventHandler() {
            document.getElementById('formClient').action = 'javascript:infoClients.processingClient("delete");';
            loadClient();
        }

        function newClientEventHandler() {
            document.getElementById('formClient').action = 'javascript:infoClients.processingClient("create");';
            setupForm();
        }

        function updateClientEventHandler() {
            document.getElementById('formClient').action = 'javascript:infoClients.processingClient("update");';
            loadClient();
        }

        function setupForm(){
            document.getElementById('formClient').style.display = 'block';
            document.getElementById('formClient').reset();
            //document.getElementById('formClient').innerHTML = '';
            document.getElementById('gender').options.length = 0;
            document.getElementById("username").readOnly = false;

            self.genders.forEach ( (e) => {
                document.getElementById('gender').options.add(new Option(e));
            });
        }

        function loadClient(){
            document.getElementById('formClient').reset();
            self.genders.forEach ( (e) => {
                document.getElementById('gender').options.add(new Option(e));
            });
            if (selected())
            document.getElementById('formClient').style.display = 'block';
            
        }
        
        createButton("divInformation", updateClientEventHandler, 'Update Client');
        //let type = localStorageObter("type");
        if (type === "Admin") {
            createButton("divInformation", newClientEventHandler, 'New Client');
            createButton("divInformation", deleteClientEventHandler, 'Delete Client');
            //createButton("divInformation", selectAllClientEventHandler, 'Select All');
        }
    }

    selectAll(){
        let self = this;
        self.getClients();

        let clientTable = document.createElement("table");
        clientTable.setAttribute("id", "clientTable");
        let th = tableLine(new Client(),true);
        clientTable.appendChild(th);
        this.clients.forEach(p=>{
            let tr = tableLine(p);
            clientTable.appendChild(tr);
        });
        replaceChilds("divInformation",clientTable);

        var table = document.getElementById("clientTable");
        var rows = table.getElementsByTagName("tr");

        for(var i = 0; i < rows.length; i++){
            var row = rows[i];

            row.addEventListener("click", function(){
            //Adicionar ao atual
            selLinha(this, false); //Selecione apenas um
            //selLinha(this, true); //Selecione quantos quiser
            });
        }
    }
    /**
     * Função que que tem como principal objetivo solicitar ao servidor NODE.JS o recurso client através do verbo GET, usando pedidos assincronos e JSON
     */
    getClients() {
        const self = this;
        let clients = this.clients;
        clients.length = 0;
        var tableElement = document.getElementById("clientTable");
        tableElement = document.createElement("table");
        tableElement.setAttribute("id", "clientTable");

        var xhr = new XMLHttpRequest();
        xhr.responseType="json";
        xhr.open("GET", "/clients", true);
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let info = xhr.response.client;
                info.forEach(p => {
                    clients.push(p);
                });
                localStorageGravar("clients",JSON.stringify(clients));
                self.showClients("selectAll");
            }
        };
        xhr.send(tableElement);
    }

    /**
     * Função que que tem como principal objetivo solicitar ao servidor NODE.JS o recurso client por id através do verbo GET, usando pedidos assincronos e JSON
     */
    getClientById(id) {
        const self = this;
        var tableElement = document.getElementById("clientTable");
        tableElement = document.createElement("table");
        tableElement.setAttribute("id", "clientTable");

        let clients = this.clients;
        clients.length = 0;
        var xhr = new XMLHttpRequest();
        xhr.responseType="json";
        xhr.open('GET', '/clientById/' + id, true);
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let info = xhr.response.client;
                info.forEach(p => {
                    clients.push(p);
                });
                localStorageGravar("clients",JSON.stringify(clients));
                self.showClients("selectById");
            }
        };
        xhr.send(tableElement);
    }

    /**
     * Função que insere ou atualiza o recurso pessoa com um pedido ao servidor NODE.JS através do verbo POST ou PUT, usando pedidos assincronos e JSON
     * @param {String} acao - controla qual a operação do CRUD queremos fazer
     */
    processingClient (acao) {

        const id = parseInt(document.getElementById('id').value);
        const name = document.getElementById('name').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const birthDate = document.getElementById('birthdate').value;
        const address = document.getElementById('address').value;
        const zipCode = document.getElementById('zipcode').value;
        const documentId = document.getElementById('documentId').value;
        const email = document.getElementById('email').value;
        const genderList = document.getElementById('gender');
        const idgender = genderList.options[genderList.selectedIndex].value;
        const phone = document.getElementById('phone').value;

        let args = [];
        args.push(name);
        args.push(username);
        args.push(password);
        args.push(birthDate);
        args.push(address);
        args.push(zipCode);
        args.push(documentId);
        args.push(email);
        args.push(idgender);
        args.push(phone);

        const client = new Client(id, name,username, password, birthDate, address, zipCode, documentId, email, idgender, phone);
        if (acao === 'create') {
            if (validadeForm(args)){
                this.postClient(client);
            } 
        } else if (acao === 'update') {
            this.putClient(client);
            
        } else if (acao === 'delete') {
            this.deleteClient(client);
        }
    }

    postClient(client){
        const self = this;
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open('POST', '/client');
        xhr.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                let id = xhr.response.client.insertId;
                self.getClientById(id);
                //const newClient = new Client(xhr.response.id, client.name, client.username, client.password, client.birthDate, client.address, client.zipCode, client.documentId, client.email, client.idgender, client.phone);
                //self.clients.push(newClient);
                self.showClients("insert");
            }
        }
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(client));
    }

    putClient(client){
        const self = this;
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', '/client/' + client.id);
        
        xhr.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                //hself.clients[self.clients.findIndex(i => i.id === client.id)] = client;
                self.getClientById(client.id);
                self.showClients("update");
            }
        }
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(client));
    }

    deleteClient(client){
        const self = this;
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', '/client/' + client.id);
        xhr.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                self.clients.splice(self.clients.findIndex(i => i.id === client.id), 1);
                self.showClients("delete");
            }
        };
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(client));
    }
}