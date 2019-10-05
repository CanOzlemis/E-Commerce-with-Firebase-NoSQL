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


var childData;
var price;
var name;
var nameid;
var quantity;
var note;
var restName;
var adress;
var status;


var restid;
var userId;
var userPhoneNo;


firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    userId = firebase.auth().currentUser.uid;

    userPhoneNo = user.phoneNumber;
    var query = firebase.database().ref("Order/" + userId);


    query.once("value")
      .then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {



          // childData will be the actual contents of the child
          childData = childSnapshot.val();
          price = childData.ucret;
          name = childData.name;
          adress = childData.adress;
          quantity = childData.quantity;
          note = childData.note;
          status = childData.status;
          restName = 0;
          var key = childData.key;
          restid = childData.restid;



          var pRestName = document.createElement("p");





          var container = document.getElementById("infoContainer");
          var div = document.createElement("div");
          div.setAttribute("class", "jumbotron");
          var h1 = document.createElement("h1");
          h1.innerHTML = name + ", " + quantity + " adet";
          var pNote = document.createElement("p");
          pNote.innerHTML = note;
          var pPhone = document.createElement("p");
          pPhone.innerHTML = userPhoneNo;
          var pRestName = document.createElement("p");
          pRestName.innerHTML = restid;
          var writePrice = document.createElement("p");
          writePrice.innerHTML = "Adet başı fiyat = " + price + " TL";
          var hr = document.createElement("hr");
          var condition = document.createElement("h3");




          if (status == 0) {
            condition.innerHTML = "SİPARİŞ ONAY BEKLEMEDE"
            condition.style.color = "black";
          }
          else if (status == 1) {
            condition.innerHTML = "SİPARİŞ ONAYLANDI"
            condition.style.color = " green";
          }
          else if (status == 2) {
            condition.innerHTML = "SİPARİŞ REDDEDİLDİ"
            condition.style.color = "red";
          }
          else { console.log("error getting status"); }

          div.appendChild(h1);
          div.appendChild(hr);
          div.appendChild(pNote);
          div.appendChild(writePrice);
          div.appendChild(pPhone);
          div.appendChild(pRestName);
          div.appendChild(condition);
          container.appendChild(div);



        });
      });

  }
  else {

    window.location.href = "./login/index.html";
  }
});





