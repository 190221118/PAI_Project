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
    //  processingLogin () {

    //     const username = document.getElementById('username_login').value;
    //     const password = document.getElementById('password_login').value;

    //     let args = [];
    //     args.push(username);
    //     args.push(password);

    //     if (validadeForm(args)){
    //         const login = new Login(username, password);
    //         getLogin(login);
    //     } 
        
    // }
    /**
     * Função que que tem como principal objetivo solicitar ao servidor NODE.JS o recurso de validar o login através do verbo GET, usando pedidos assincronos e JSON
     */
    // getLogin(login) {
    //     var xhr = new XMLHttpRequest();
    //     xhr.responseType="json";
    //     xhr.open('GET', '/getLogin/' + login.username + login.password, true);
    //     xhr.onreadystatechange = function () {
    //         if (this.readyState === 4 && this.status === 200) {
    //             let infoLogin = xhr.response.login;
    //             if (infoLogin.response === 1){
    //                 sessionStorage.setItem('login','{username: username, other:sessionData,whatever:bar}');
    //                 return true;
    //             }return false;
    //         }
    //     };
    //     xhr.send();
    // }
}