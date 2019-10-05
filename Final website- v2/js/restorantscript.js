document.addEventListener('contextmenu', event => event.preventDefault());



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

document.getElementById("data").style.display = "none";
var storeName = document.getElementById("data").innerHTML;

var userPhoneNo = 0;
var userId;

firebase.auth().onAuthStateChanged(function (user) {
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

function adetControl(i) {
  adet[i] = prompt("Kaç tane?(en az 1)", "1");

  while (1) {
    if ((adet[i] <= 0) || (isNaN(adet[i])) || (adet[i] > 20)) {
      adet[i] = prompt("Girdiğiniz miktar geçersiz, 0 dan büyük, 20 den küçük bir değer girin", "1");
    }
    else { break; }
  }
  return adet[i];
}

var storeUID;
var counter = 0;
var query = firebase.database().ref("Restaurant/" + storeName + "/" + storeName).orderByKey();
query.once("value")
  .then(function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      // key will be "ada" the first time and "alan" the second time
      var key = childSnapshot.key;

      // childData will be the actual contents of the child
      var childData = childSnapshot.val();
      var price = childData.ucret;
      var name = childData.name;
      var nameid = childData.nameid;
      var bgPicture = childData.bgPicture;
      var description = childData.description;

      var products = document.getElementById("products");

      var divitem = document.createElement("div");
      divitem.setAttribute("class", "item col-xs-4 col-lg-4");

      var divthumbnail = document.createElement("div");
      divthumbnail.setAttribute("class", "thumbnail card");

      var divimg = document.createElement("div");
      divimg.setAttribute("class", "img-event");

      var img = document.createElement("img");
      img.setAttribute("class", "group list-group-image img-fluid");
      img.setAttribute("src", bgPicture);

      var divcaption = document.createElement("div");
      divcaption.setAttribute("class", "caption card-body");

      var h4 = document.createElement("h4");
      h4.setAttribute("class", "group card-title inner list-group-item-heading");
      h4.innerHTML = name;

      var p = document.createElement("p");
      p.setAttribute("class", "group inner list-group-item-text");
      p.innerHTML = description;

      var divrow = document.createElement("div");
      divrow.setAttribute("class", "row");

      var divcol = document.createElement("div");
      divcol.setAttribute("class", "col-xs-12 col-md-6");

      var pPrice = document.createElement("p");
      pPrice.setAttribute("class", "lead");
      pPrice.innerHTML = price + " TL";

      var divButton = document.createElement("div");
      divButton.setAttribute("class", "col-xs-12 col-md-6");

      var button = document.createElement("button");
      button.setAttribute("class", "btn btn-success");
      button.setAttribute("onclick", "addbtn" + "(" + price + ", " + "'" + name + "'" + ", " + counter + ", " + "'" + name + "'" + ", " + "'" + nameid + "'" + ")");
      button.innerHTML = "Sepete ekle";


      divimg.appendChild(img);
      divcol.appendChild(pPrice);
      divButton.appendChild(button);
      divrow.appendChild(divcol);
      divrow.appendChild(divButton);
      divcaption.appendChild(h4);
      divcaption.appendChild(p);
      divcaption.appendChild(divrow);
      divthumbnail.appendChild(divimg);
      divthumbnail.appendChild(divcaption);
      divitem.appendChild(divthumbnail);
      products.appendChild(divitem);








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

firebase.database().ref("Restaurant").child(storeName).on("value", function (snapshot) {

  var childData = snapshot.val();
  storeUID = childData.nameid;
});





function addbtn(fprice, fname, farray, buttonID, nameid) {


  var array_access = farray;   // NUMBER IS THE ARRAY LIST
  var f_adet;
  var btn = document.getElementById(buttonID);


  f_adet = adetControl(array_access);   // TO SET THE ARRAY VALUE


  function writeOrderData() {
    var pushKey = firebase.database().ref("Basket/" + userId + "/").push();

    var getPush = pushKey.key;

    var orderNotes = prompt("Eklemek istediğiniz notlar (Örnek : acısız) ?");

    pushKey.update({



      notes: orderNotes,
      name: fname,
      nameid: nameid,
      ucret: String(fprice),
      quantity: f_adet,
      key: getPush,
      restid: storeUID


    }, function (error) {
      if (error) {
        alert("Siparişiniz gönderilemedi, lütfen tekrar deneyin");
      } else {

        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
      }
    });
  }

  writeOrderData();

}



