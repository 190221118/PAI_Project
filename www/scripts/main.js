"use strict";
/**
 * Função que será executada quando a página estiver toda carregada, criando a variável global "info" com um objeto Information
 * Aproveitamos ainda para solicitar ao servidor o carregamento de dados de forma assincrona(AJAX)
 * @memberof window
 * @params {Event} event - objeto que representará o evento
 */
window.onload = function (event) {
    var infoClients = new InformationClients("divInformation");
    var infoProducts = new InformationProducts("divInformation");
    //infoClients.getClients();
    //infoProducts.getCategories();
    //infoProducts.getProducts();
    window.infoClients = infoClients;
    window.infoProducts = infoProducts;

    var login = new Login("login");
    //login.logOff();
    window.login = login;
    
};

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

function selectedClient(selecteds){
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
        document.getElementById('gender').value= selected[9].textContent;    
        document.getElementById('phone').value = selected[10].textContent;
    }
}

function selectedProduct(selecteds){
    for(var i = 0; i < selecteds.length; i++){
        var selected = selecteds[i];
        selected = selected.getElementsByTagName("td");

        document.getElementById('idProduct').value = selected[0].textContent;
        document.getElementById("idProduct").setAttribute("readonly", "readonly");
        document.getElementById('nameProduct').value = selected[1].textContent;
        document.getElementById('descriptionProduct').value = selected[2].textContent;
        var category = document.getElementById("categoryProduct");
        document.getElementById('categoryProduct').options[category.selectedIndex].textContent = selected[3].textContent;
        document.getElementById('priceProduct').value = selected[5].textContent;
    }
}

/**
 * Função que retorna o id da linha selecionada
 */
function selected(tableObj, tableName){
    //let table = document.getElementById("clientTable");
    let table = tableObj;
	let selecteds = table.getElementsByClassName("selecionado");
    //Verificar se eestá selecionado
    if(selecteds.length < 1){
  	    alert("Selecione pelo menos uma linha");
        return false;
    }

    if(tableName === "clients"){
        selectedClient(selecteds);
    }
    else if(tableName === "products"){
        selectedProduct(selecteds);
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

function cleanCanvasClient(){
    let canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function cleanCanvasProduct(){
    let canvas = document.getElementById('canvasProduct');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//carregar imagem

const worker = new Worker('scripts/worker.js'); 

worker.addEventListener('message', d=>{
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const imgData = d.data; 
    ctx.putImageData(imgData,0,0);
});

function applyFilter(c){
    const canvas = document.getElementById(c);
    const canvasCtx = canvas.getContext('2d');
    const imgData = canvasCtx.getImageData(0,0, canvas.width, canvas.height);
    worker.postMessage(imgData);
}

function inputChangeClient(e) {    
    
    if (e.target.files.length === 0)return;
        const file=e.target.files[0];
        processImage(file,"canvas");
}

function inputChangeProduct(e) {    
    
    if (e.target.files.length === 0)return;
        const file=e.target.files[0];
        processImage(file,"canvasProduct");
}

async function processImage(file, img){
    const bitmap = await createImageBitmap(file);
    // Load an image of intrinsic size 300x227 in CSS pixels
    const canvas = document.getElementById(img);
    const canvasCtx = canvas.getContext('2d');
    bitmap.onload = drawImageActualSize(canvas.width,canvas.height,canvasCtx);
    
    function drawImageActualSize(width,height) {
        // Use the intrinsic size of image in CSS pixels for the canvas element
        bitmap.resizeWidth =width;
        bitmap.resizeHeight =height;
        canvasCtx.drawImage(bitmap, 0, 0, width, height);
    }
    applyFilter(img);
}

function addDiv(category, product, image){
    let div = document.createElement("div");
    div.style.display = "inline-block";
    div.textContent = category + " " + product;
    let img = document.createElement("img");
    img.src = image;
    img.style.height = "100px";
    img.style.width = "100px";
    document.getElementById("divProductList").appendChild(div);
    document.getElementById("divProductList").appendChild(img)
}