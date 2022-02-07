"use strict";

/** 
* @class Structure with capacity to store the login
* @constructs Login
  @param {string} id - id of the HTML element that contains the information.

  @property  {string} username - client's username
  @property  {string} password - client's password
*/
class Login {
    constructor(id) {
        this.id = id;
        this.username = username;
        this.password = password;
        
    }

    /**
     * Function that inserts or updates the resource person with a request to the NODE.JS server through the POST or PUT verb, using asynchronous requests and JSON
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
     * Function that has as main goal to request to the NODE.JS server the login validation resource through the GET verb, using asynchronous requests and JSON
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
     * Function that removes session storage 
    */
    logOff() {
        isLoggedIn();
        sessionStorageLimpar("username_login");
        localStorageLimpar("id");
        localStorageLimpar("type");
        localStorageLimpar("clients");
        document.getElementById("menuLogin").style.display = "none";
        document.getElementById("divInformation").style.display="none";    
        document.getElementById("formClient").style.display = "none";
        document.getElementById("formClient").style.display = "none";
        location.reload();
    }

    /**
     * Function to show the login form
     */
    showHomeLogin() {
        isLoggedIn();
        document.getElementById("headerTitle").textContent="Home";
        document.getElementById("divInformation").style.display="none";    
        document.getElementById("formClient").style.display = "none";
        document.getElementById("sectionLogin").style.display = "none";
        if (sessionStorageObter("username_login") === null) {
                document.getElementById("formLogin").style.display = "block";
                document.getElementById("menuLogin").style.display = "none";
        }
        else {
                document.getElementById("formLogin").style.display = "none";
                document.getElementById("menuLogin").style.display = "block";
                document.getElementById("sectionLogin").style.display = "none";
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