"use strict";
/**
 * Função que será executada quando a página estiver toda carregada, criando a variável global "info" com um objeto Information
 * Aproveitamos ainda para solicitar ao servidor o carregamento de dados de forma assincrona(AJAX)
 * @memberof window
 * @params {Event} event - objeto que representará o evento
 */
window.onload = function (event) {
    var infoClients = new InformationClients("divInformation");
    infoClients.getClients();
    window.infoClients = infoClients;

    var login = new Login("login");
    window.login = login;
};

const worker = new Worker('scripts/worker.js');
worker.addEventListener('message',d=>{

           
});
/**
 * Função que valida se os campos do formulario estao preenchidos (facilitador de DOM)
 * @param {string[]} args - array de argumentos
 */
function validadeForm(args) {
    let result = true;
    args.forEach(function(item,index,array) {
        if (item.trim() === "" || item == null)
            result = false;
    });
    if (!result) {
        alert("todos os parametros devem ser preenchidos!");
        return false;
    }
    else {return true;}
}
/**
 * Função que substitui todos os elementos filhos de um elemento HTML por um novo elemento HTML (facilitador de DOM)
 * @param {string} id - id do elemento HTML para o qual se pretende substituir os filhos.
 * @param {HTMLElement} newSon - elemento HTML que será o novo filho.
 */
function replaceChilds(id, newSon) {
    var no = document.getElementById(id);
    while (no.hasChildNodes()) {
        no.removeChild(no.lastChild);
    }
    no.appendChild(newSon);
};

/**
 * Função que recebe um qualquer objeto e retorna dinamicamente uma linha de tabela HTML com informação relativa ao estado das suas propriedades
 * @param {Object} object - objecto do qual vamos transformar o conteudo dos seus atributos em linhas
 * @param {boolean} headerFormat - controla de o formato é cabeçalho ou linha normal
 */
function tableLine(object, headerFormat) {
    var tr = document.createElement("tr");
    var tableCell = null;
    for (var property in object) {
        if ((object[property] instanceof Function))
            continue;
        if (headerFormat) {
            tableCell = document.createElement("th");
            tableCell.textContent = property[0].toUpperCase() + property.substr(1, property.length - 1);
        } else {
            tableCell = document.createElement("td");
            tableCell.textContent = object[property];
        }
        tr.appendChild(tableCell);
    }
    return tr;
};

/**
Caso passe true, você pode selecionar multiplas linhas.
Caso passe false, você só pode selecionar uma linha por vez.
**/
function selLinha(linha, multiplos){
    if(!multiplos){
        var linhas = linha.parentElement.getElementsByTagName("tr");
          for(var i = 0; i < linhas.length; i++){
             var linha_ = linhas[i];
             linha_.classList.remove("selecionado");    
          }
    }
    linha.classList.toggle("selecionado");
}
/**
 * Função que retorna o id da linha selecionada
 */
function selected(){
    let table = document.getElementById("clientTable");
	let selecteds = table.getElementsByClassName("selecionado");
    //Verificar se eestá selecionado
    if(selecteds.length < 1){
  	    alert("Selecione pelo menos uma linha");
        return false;
    }

    for(var i = 0; i < selecteds.length; i++){
        var selected = selecteds[i];
        selected = selected.getElementsByTagName("td");

        document.getElementById("id").value = selected[0].textContent;
        document.getElementById('name').value = selected[1].textContent;
        document.getElementById('username').value = selected[2].textContent;
        document.getElementById("username").setAttribute("readonly", "readonly");
        document.getElementById('password').value = selected[3].textContent;
        document.getElementById('birthdate').value = selected[4].textContent;
        document.getElementById('address').value = selected[5].textContent;
        document.getElementById('zipcode').value = selected[6].textContent;
        document.getElementById('documentId').value = selected[7].textContent;
        document.getElementById('email').value = selected[8].textContent;
        //document.getElementById('gender').value = selected[9].textContent;
        var comboGender = document.getElementById("gender");
        document.getElementById('gender').options[comboGender.selectedIndex].value = selected[9].textContent;
     
        document.getElementById('phone').value = selected[10].textContent;
    }
    return true;
}

/**
 * Função genérica que cria um botão HTML, dá-lhe um evento e coloca-o na árvore de nós
 * @param {string} fatherNodeName - nó pai do botão
 * @param {function} eventHandler - evento do botão.
 * @param {String} value - texto do botão.
 */
 function createButton(fatherNodeName, eventHandler, value) {
    let fatherNode = document.getElementById(fatherNodeName);
    const button = document.createElement('input');
    button.type = 'button';
    button.value = value;
    button.addEventListener('click', eventHandler);
    fatherNode.appendChild(button);
}
// session storage
function sessionStorageGravar(arg) { 
    var text = document.getElementById(arg).value; 
    sessionStorage.setItem(arg, text); 
} 
function sessionStorageObter(arg) { 
    return sessionStorage.getItem(arg); 
} 
function sessionStorageLimpar(arg) { 
    sessionStorage.removeItem(arg); 
    //document.getElementById("Data").value = ""; 
} 
// local storage
function localStorageGravar(arg,obj) { 
    localStorage.setItem(arg, obj);
} 
function localStorageObter(arg) { 
    return localStorage.getItem(arg); 
} 
function localStorageLimpar(arg) { 
    localStorage.removeItem(arg);
    //document.getElementById("Data").value = ""; 
} 
// function sessionStorageItemGravar() { 
//     var text = document.getElementById("item").value; 
//     sessionStorage.setItem("item", text); 
//     var text = document.getElementById("quantidade").value; 
//     sessionStorage.setItem("quantidade", text); 
// } 
// function sessionStorageObterLoja(){

//     let divs = document.querySelectorAll('loja');
//     let nome = sessionStorage.getItem("item");

//     divs.forEach((ds,index) => {

//     ds.value = nome; 

//     });
// }