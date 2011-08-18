/* main.js
 Author: Joseph Malone            
 Course: Visual Frameworks        
 Term  : 1108 Instructor: C.Gibson 
 Date  : August 18, 2011           

 Description: Project 3 - one part of a mobile
 web app which, when completed, will allow users to
 build a custom to-do or shopping list.
*/

window.onload = addNewItem(), addNewPackage();
var db = localStorage; // just shortening the name a bit //

// set regular expression used to check orderdate format //
var regExp=/\b201[1-9]{1}-[0-9]{2}-[0-9]{2}\b/;

// populates the distributor selection //
function addNewItem(){
    var newItemtxt;
    var newItem;
    var distName = ["USFoods","BestMeats","Condiments"];
    var getItem = document.getElementById("dist");
    // sets the attribute to selected on the BestMeats distributor //
    for (var i=0, j=distName.length; i<j; i++){
        newItem = document.createElement("option");
        newItemtxt = document.createTextNode(distName[i]);
        newItem.appendChild(newItemtxt);
        getItem.appendChild(newItem);
    }
}
// populates the package amount selector //
function addNewPackage(){
    var newPackageTxt;
    var newPackage;
    var package=["Boxes","Pounds","Cases","Cans"];
    var getPackage = document.getElementById("amount");
    // sets the attribute to selected on the Cases package amount //
    for (var i = 0, l=package.length; i < l; i++) {
        if (package[i]=="Cases") {
            newPackage = document.createElement("option");
            packageAttr = newPackage.setAttribute("selected","");
            newPackageTxt = document.createTextNode(package[i]);
            newPackage.appendChild(newPackageTxt);
            getPackage.appendChild(newPackage);
        }else{
            newPackage = document.createElement("option");
            newPackageTxt = document.createTextNode(package[i]);
            newPackage.appendChild(newPackageTxt);
            getPackage.appendChild(newPackage);
        }
    }
}
// stores the user input to db (localstorage)// 
function storeItem(id){
    // set variables //
    var dist = document.getElementById("dist").value;
    var item = document.getElementById("item").value;
    var quantity = document.getElementById("quantity").value;
    var amount = document.getElementById("amount").value;
    var ordered = document.getElementById("ordered").value;
    var orderdate = document.getElementById("orderdate").value;
    var note = document.getElementById("note").value;
    // validate fields //
    if (dist == "no"){ // if no distributor selected //
        alert("Please select Distributor");
        document.getElementById("dist").style.border = "3px double hotpink";
        return false;
    }else {
        document.getElementById("dist").style.border = "3px double cyan";
    }
    if (item == ""){ // if item left blank //
        document.getElementById("item").style.border = "3px double red";
        var encourage = prompt("Please enter an item name.", "");
        if (encourage != "") {
            document.getElementById("item").value = encourage;
        }
        return false;
    }else {
        document.getElementById("item").style.border = "3px double cyan";
    }
    if (ordered == "on") { // set value if checked or not checked //
        ordered = "Is Ordered";
    }else {
        ordered = "Not Ordered";
    }
    if (orderdate == ""){ // if orderdate left blank //
        alert("Please Enter Order Date");
        document.getElementById("orderdate").style.border = "3px double red";
        return false;
    }
    // if orderdate is incorrect format //
    var OK=regExp.exec(orderdate);
    if (!OK){
        alert("not valid date format");
        document.getElementById("errdate").innerHTML = "yyyy-mm-dd"; 
        document.getElementById("orderdate").value;
        return false;
    }else {
        document.getElementById("errdate").style.display= "none";
    }
    if (note == ""){ // set value if note left blank //
        note = "No additional notes"
    }
    // set data to localStorage //
    db.setItem("adist",dist);
    db.setItem("aitem",item);
    db.setItem("aquantity",quantity);
    db.setItem("aamount",amount);
    db.setItem("aordered",ordered);
    db.setItem("aorderdate",orderdate);
    db.setItem("anote",note);
   
    alert("form submitted");
}
// gets the data from db (localstorage) and puts it in an array for display //
function getItems(){
    var dist="Distributor : " + db.getItem("adist");
    var item="Item : " + db.getItem("aitem");
    var quantity="Quantity : " + db.getItem("aquantity");
    var amount="Amount : " + db.getItem("aamount");
    var ordered="Ordered? : " + db.getItem("aordered");
    var orderdate="Order Date : " + db.getItem("aorderdate");
    var note="Notes : " + db.getItem("anote");
    
    var viewItems = [
        dist,
        item,
        quantity,
        amount,
        ordered,
        orderdate,
        note
    ];
    
    // hide div:main show div:clear //
    document.getElementById("main").style.display = "none";
    document.getElementById("clear").style.display = "block";
    // depending on what distributor - show image //
    var dist2= db.getItem("adist"); 
    if (dist2=="BestMeats") {
        document.getElementById("distpic1").style.display ="block";
    }else if (dist2=="USFoods") {
        document.getElementById("distpic2").style.display ="block";
    }else if (dist2=="Condiments") {
        document.getElementById("distpic3").style.display ="block";
    }
    // list item info //
    var getMyList = document.getElementById("list");
    for (var i=0, j=viewItems.length; i<j; i++){
        var newP = document.createElement("p");
        var itemTxt = document.createTextNode(viewItems[i]);
        newP.appendChild(itemTxt);
        getMyList.appendChild(newP);
    }
    //alert(viewItems);
    
}
// function to clear db (localstorage) //
function clearStorage(){
    alert("storage cleared");
    db.clear();
    return false;
}
// function to show the number for the select slider
function showValue(number){
    document.getElementById("selected_amount").innerHTML = number;   
}


