"use strict";

/** 
* @class Guarda toda informação necessaria na execução do exercicio 
* @constructs Informacao
* @param {string} id - id do elemento HTML que contém a informação.
* 
* @property {string} id - id do elemento HTML que contém a informação.
* @property {client[]} clients - Array de objetos do tipo client, para guardar todas as pessoas do nosso sistema
  @property {string[]} genders - Array de objetos do tipo client, para guardar todas as pessoas do nosso sistema
*/
class Information {
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
        let cleanDiv= document.createElement("div");
        replaceChilds("divInformation",cleanDiv);
    }
    /**
     * coloca a palavra "Client" no div titulo e cria dinamicamente uma tabela com a informação dos clientes
     */
     showClients() {
        let self = this;
        /** @todo Completar */
        /** @todo Tarefa 1 */
        /** Actualizar o título */
        document.getElementById("headerTitle").textContent="Clients";
        document.getElementById("divInformation").style.display="block";
        document.getElementById("formClient").style.display = "none";   
        
        /** @todo Tarefa 2 */
        /** Mostrar o conteúdo */
        let clientTable = document.createElement("table");
        let th = tableLine(new Client(),true);
        clientTable.appendChild(th);
        this.clients.forEach(p=>{
            let tr = tableLine(p);
            clientTable.appendChild(tr);
        });
        replaceChilds("divInformation",clientTable);
        
        function deleteClientEventHandler() {
            document.getElementById('formClient').action = 'javascript:info.processingClient("delete");';
            setupForm();
        }

        function newClientEventHandler() {
            document.getElementById('formClient').action = 'javascript:info.processingClient("create");';
            setupForm();
        }

        function updateClientEventHandler() {
            document.getElementById('formClient').action = 'javascript:info.processingClient("update");';
            setupForm();
        }

        function setupForm(){
            document.getElementById('formClient').style.display = 'block';
            document.getElementById('formClient').reset();
            //document.getElementById('formClient').innerHTML = '';
            document.getElementById('gender').options.length = 0;

            self.genders.forEach ( (e) => {
                document.getElementById('gender').options.add(new Option(e));
            });
        }

        createButton("divInformation", newClientEventHandler, 'New Client');
        createButton("divInformation", deleteClientEventHandler, 'Delete Client');
        createButton("divInformation", updateClientEventHandler, 'Update Client');
    }
    /**
     * Função que que tem como principal objetivo solicitar ao servidor NODE.JS o recurso client através do verbo GET, usando pedidos assincronos e JSON
     */
     getClient() {
        let clients = this.clients;
        var xhr = new XMLHttpRequest();
        xhr.responseType="json";
        xhr.open("GET", "/clients", true);
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let info = xhr.response.client;
                info.forEach(p => {
                    clients.push(p);
                });
            }
        };
        xhr.send();
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

        const client = new Client(id, name,username, password, birthDate, address, zipCode, documentId, email, idgender, phone);
        if (acao === 'create') {
            this.postClient(client);
        } else if (acao === 'update') {
            this.putPerson(client);
        } else if (acao === 'delete') {
            this.deletePerson(client);
        }
    }

    postClient(client){
        const self = this;
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open('POST', '/client');
        xhr.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                const newClient = new Client(xhr.response.id, client.name, client.username, client.password, client.birthDate, client.address, client.zipCode, client.documentId, client.email, client.idgender, client.phone);
                self.clients.push(newClient);
                self.showClients();
            }
        }
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(client));
    }

    putPerson(person){
        const self = this;
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', '/person/' + person.id);
        xhr.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                self.people[self.people.findIndex(i => i.id === person.id)] = person;
                self.showPerson();
            }
        }
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(person));
    }
    deletePerson(person){
        const self = this;
        const xhr = new XMLHttpRequest();
        xhr.open('DELETE', '/person/' + person.id);
        xhr.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                self.people.splice(self.people.findIndex(i => i.id === person.id), 1);
                self.showPerson();
            }
        };
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(person));
    }
}