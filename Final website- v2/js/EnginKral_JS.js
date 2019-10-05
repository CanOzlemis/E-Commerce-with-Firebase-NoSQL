// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCJ-sod9xxMtkFM4ntuUYMkYhPlISv8TEg",
    authDomain: "lau-cepte.firebaseapp.com",
    databaseURL: "https://lau-cepte.firebaseio.com",
    projectId: "lau-cepte",
    storageBucket: "lau-cepte.appspot.com",
    messagingSenderId: "767239100059"
  };
  firebase.initializeApp(config);


var userPhoneNo = 0;
var userId;

firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
          userPhoneNo = user.phoneNumber;
          userId = firebase.auth().currentUser.uid;
      }
        else {
            
            window.location.href = "./login/index.html";
        }
    });
    


 document.getElementById('sign-out-button').addEventListener('click', function onSignOutClick() {
    firebase.auth().signOut();
     window.location.href = "./login/index.html";
  });





var adet = [];

function adetControl (i) {
    adet[i] = prompt("Kaç tane?(en az 1)", "1");
        
    while(1){
        if ( (adet[i] <= 0) || (isNaN(adet[i]) ) || (adet[i] > 20) ) {
            adet[i] = prompt("Girdiğiniz miktar geçersiz, 0 dan büyük, 20 den küçük bir değer girin", "1");
         }
        else { break; }
    }
    return adet[i];
}
var storeUID;
var counter = 0;
var query = firebase.database().ref("Restaurant/EnginKral/EnginKral").orderByKey();
query.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      // key will be "ada" the first time and "alan" the second time
      var key = childSnapshot.key;
        
      // childData will be the actual contents of the child
      var childData = childSnapshot.val();
      var price = childData.ucret;
      var name = childData.name;
      var nameid = childData.nameid;
      var listName = childData.listName;
      var bgPicture = childData.bgPicture;
      var description = childData.description;
        
        var content = document.getElementById("content");
        var div = document.createElement("div");
        var hr = document.createElement("hr");
        var h1 = document.createElement("h1");
        var p = document.createElement("p");
        var img = document.createElement("img");
        var h4 = document.createElement("h4");
        var button = document.createElement("button");
        var divInfo = document.createElement("div");
        button.setAttribute("onclick", "addbtn" + "(" + price + ", " + "'" +  name + "'" + ", " + counter + ", " + "'" + listName + "'" + ", " + "'" + name + "'" + ", " + "'" + nameid + "'" + ")");
        img.setAttribute("src", bgPicture);
        button.innerHTML = "Sepete Ekle";
        div.setAttribute("class", "listItem");
        divInfo.setAttribute("class", "infoArea");
        button.setAttribute("id", name);
        p.innerHTML = price + " TL";
        h1.innerHTML = name;
        
        h4.innerHTML = description;
        
        
        div.appendChild(img);
        divInfo.appendChild(h1);
        divInfo.appendChild(p);
        divInfo.appendChild(hr);
        divInfo.appendChild(h4);
        div.appendChild(divInfo);
        

        div.appendChild(button);
        content.appendChild(div);
        
  });
});





var storeUID;
/*
var getid = firebase.database().ref("Restaurant/EnginKral").orderByKey();
getid.once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      // key will be "ada" the first time and "alan" the second time
      var key = childSnapshot.key;
        
        var keyName = key.name;
        
        
      // childData will be the actual contents of the child
      var childData = childSnapshot.val();
        console.log("childData = " + childData);
        if ( childData == "EnginKral")
            {
               storeUID = childData;
                console.log("COMPLETED" + storeUID);
                return;
            }
console.log("storeUID = " + storeUID);
  });
});
*/

firebase.database().ref("Restaurant").child('EnginKral').on("value", function(snapshot) {
   
    var childData = snapshot.val();
    storeUID = childData.nameid;
    });





function addbtn(fprice, fname, farray, flist, buttonID, nameid) {


    var array_access = farray;   // NUMBER IS THE ARRAY LIST
    var f_adet;
    var btn = document.getElementById(buttonID);

        
        f_adet = adetControl(array_access);   // TO SET THE ARRAY VALUE
        
        

        function writeOrderData() {
            
            var orderNotes = prompt("Eklemek istediğiniz notlar (Örnek : acısız) ?");
                      firebase.database().ref("Basket/" + userId + "/").push().update({
                          
                          
                         phone : userPhoneNo,
                         //ARRANGE THIS TO WRITE EVERYTHING IN THE LIST
                         //productTotalPrice : totalPrice,
                         //productLocation : orderLocation,
                          notes : orderNotes,
                          name: fname,
                          nameid: nameid,
                          ucret: fprice,
                          quantity: f_adet,
                          restid: storeUID
                          
                          
                          }, function(error) {
                                if (error) {
                                  alert("Siparişiniz gönderilemedi, lütfen tekrar deneyin");
                                } else {
                                    
                                    var x = document.getElementById("snackbar");
                                    x.className = "show";
                                    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
                                } } );}
                 
                 writeOrderData();
 
}




// ORDER BUTTON FUNCTION FROM THIS POINT ON !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/*
buttonText.innerHTML = tickMark;
var button = document.querySelector('.button');
var buttonText = document.querySelector('.tick');

const tickMark = "<svg width=\"29\" height=\"45\" viewBox=\"0 0 58 45\" xmlns=\"http://www.w3.org/2000/svg\"><path fill=\"#fff\" fill-rule=\"nonzero\" d=\"M19.11 44.64L.27 25.81l5.66-5.66 13.18 13.18L52.07.38l5.65 5.65\"/></svg>";


button.addEventListener('click', function() {
    
    var namesOfProduct = $( "ol.listofOrders" ).text();
    var tick = this;
    var check_li = document.getElementById("orderItem").getElementsByTagName("li").length;
    var get_data_li = document.getElementById("orderItem").getElementsByTagName("li");

    if (check_li > 0) {
         if (buttonText.innerHTML === "Siparişi ver") {
             var orderLocation = prompt("Sipariş nereye gelicek (Örnek : Prime Park)?");
          
             if ((orderLocation.length > 2) && (isNaN(orderLocation))) {
                 
                 function writeUserData() {
                      firebase.database().ref("Basket/" + userId + "/" + Math.floor((Math.random() * 100) + 1)  ).update({
                          
                         phone : userPhoneNo,
                         //ARRANGE THIS TO WRITE EVERYTHING IN THE LIST
                         productTotalPrice : totalPrice,
                         productLocation : orderLocation,
                         productNotes : orderNotes,
                         productNames : namesOfProduct
                          
                          }, function(error) {
                                if (error) {
                                  alert("Siparişiniz gönderilemedi, lütfen tekrar deneyin");
                                } else {
                                    buttonText.innerHTML = tickMark;
                                    tick.classList.toggle('button__circle');
                                    
                                    
                                    setTimeout(function(){
                                        location.reload(); 
                                    }, 2000);
                                    
                                } } );}
                 
                 writeUserData();
             
          } else { alert("Lütfen alanları doğru doldurunuz!"); } }
    
    } else { alert("Sipariş listeniz boş!"); } } ); 
*/