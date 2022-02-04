"use strict";

/** 
* @class Estrutura com capacidade de armazenar o login
* @constructs Login
  @param {string} id - id do elemento HTML que contém a informação.

  @property  {string} username - username do cliente
  @property  {string} password - nome do cliente
*/
class Login {
    constructor(id) {
        this.id = id;
        this.username = username;
        this.password = password;
        
    }
    /**
     * Função que insere ou atualiza o recurso pessoa com um pedido ao servidor NODE.JS através do verbo POST ou PUT, usando pedidos assincronos e JSON
     */
     processingLogin () {

        const username = document.getElementById('username_login').value;
        const password = document.getElementById('password_login').value;

        let args = [];
        args.push(username);
        args.push(password);

        if (validadeForm(args)){
            const login = new Login(username, password);
            this.postLogin(username,password);
        }
        
    }
    /**
     * Função que que tem como principal objetivo solicitar ao servidor NODE.JS o recurso de validar o login através do verbo GET, usando pedidos assincronos e JSON
     */
    postLogin(username, password) {
        let self = this;
        var xhr = new XMLHttpRequest();
        xhr.responseType="json";
        xhr.open('POST', '/postLogin/' + username + '/' + password, true);
        xhr.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                let retorno = xhr.response.login[0].retorno;
                if (retorno > 0) {
                    let id = xhr.response.login[0].id;
                    let type = xhr.response.login[0].type;

                    sessionStorageGravar("username_login");
                
                    localStorageGravar("id",id);
                    localStorageGravar("type",type);

                    alert("Login ok!");
                    self.showHomeLogin();
                    return true;
                }alert("Login Not ok!");
                sessionStorageLimpar("username_login");
                return false;            
            }
        };
        xhr.send();
    }
    /**
     * Função que que remove a session storage 
    */
    logOff() {
        sessionStorageLimpar("username_login");
        localStorageLimpar("id");
        localStorageLimpar("type");
        localStorageLimpar("clients");
        document.getElementById("menuLogin").style.display = "none";
        document.getElementById("divInformation").style.display="none";    
        document.getElementById("formClient").style.display = "none";
    }

    showHomeLogin() {
        document.getElementById("headerTitle").textContent="Home";
        document.getElementById("divInformation").style.display="none";    
        document.getElementById("formClient").style.display = "none";
        if (sessionStorageObter("username_login") === null) {
                document.getElementById("formLogin").style.display = "block";
                document.getElementById("menuLogin").style.display = "none";
        }
        else {
                document.getElementById("formLogin").style.display = "none";
                document.getElementById("menuLogin").style.display = "block";
                document.getElementById("menuLogin").textContent = "Log Off";

                let id = localStorageObter("id");
                let type = localStorageObter("type");
                if (type === "Client") {
                    infoClients.getClientById(id);
                    infoProducts.getProducts();
                }
                else{
                    infoClients.getClients();
                    infoProducts.getCategories();
                    infoProducts.getProducts();
                }
                //localStorageGravar("client",JSON.stringify(infoClients.clients));
        }
    }

}