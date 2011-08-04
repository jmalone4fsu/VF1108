//Joseph Malone//

window.onload = addNewItem();

function addNewItem(){
    var getItem = document.getElementById("dist");
    var newItem = document.createElement("option");
    var newItemtxt = document.createTextNode("Condiments");
    newItem.appendChild(newItemtxt);
    getItem.appendChild(newItem);
    
}