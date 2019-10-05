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



var adet = [];

function adetControl(i) {
    adet[i] = prompt("Kaç tane?(en az 1)", "1");

    while (1) {
        if ((adet[i] <= 0) || (isNaN(adet[i])) || (adet[i] > 50)) {
            adet[i] = prompt("Girdiğiniz miktar geçersiz, 0 dan büyük, 50 den küçük bir değer girin", "1");
        }
        else { break; }
    }
    return adet[i];
}

function adetControlKG(i) {
    adet[i] = prompt("Kaç KİLOGRAM?(en az 0.5)", "1");

    while (1) {
        if ((adet[i] <= 0.4) || (isNaN(adet[i])) || (adet[i] > 15)) {
            adet[i] = prompt("Girdiğiniz miktar geçersiz, 0.4 ten büyük, 15 ten küçük bir değer girin", "1");
        }
        else { break; }
    }
    return adet[i];
}


var userId;
var userPhoneNo;

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        userId = firebase.auth().currentUser.uid;

        userPhoneNo = user.phoneNumber;

    }
    else {

        window.location.href = "./login/index.html";
    }
});



document.getElementById('sign-out-button').addEventListener('click', function onSignOutClick() {
    firebase.auth().signOut();
    window.location.href = "./login/index.html";
});



var totalPrice = 0;
var adet = [];

var userPhoneNo = 0;
var userId;



firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        userPhoneNo = user.phoneNumber;
        userId = firebase.auth().currentUser.uid;
    }
});

var products = ["Drinks", "Snacks", "Foodsupply", "Greengrocery", "Alcahol", "Breakfast", "Readyfood", "Personelcare", "Meat", "Cleaning", "Others"]


var productCounter = 0;
var counter = 0;


var storeUID;
function orderData() {
    var query = firebase.database().ref("Market/Aymu/Products/" + products[productCounter]).orderByKey();
    query.once("value")
        .then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {

                var key = childSnapshot.key;


                var childData = childSnapshot.val();
                var price = childData.ucret;
                var name = childData.name;
                var bgPicture = childData.bgPicture;
                var nameid = childData.nameid;


                var content = document.getElementById("content_" + products[productCounter]);


                var divitem = document.createElement("div");
                divitem.setAttribute("class", "item col-xs-4 col-lg-4 content_" + products[productCounter]);

                var divthumbnail = document.createElement("div");
                divthumbnail.setAttribute("class", "thumbnail card");

                var divimg = document.createElement("div");
                divimg.setAttribute("class", "img-event");

                var img = document.createElement("img");
                img.setAttribute("class", "group list-group-image img-fluid");
                if (bgPicture == undefined) {
                    img.setAttribute("src", "pictures/No_picture_available.png");
                } else {
                    img.setAttribute("src", bgPicture);
                }


                var divcaption = document.createElement("div");
                divcaption.setAttribute("class", "caption card-body");

                var h4 = document.createElement("h4");
                h4.setAttribute("class", "group card-title inner list-group-item-heading");
                h4.innerHTML = name;

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

                if (productCounter == 3) {
                    button.setAttribute("onclick", "addbtnKG" + "(" + price + ", " + "'" + name + "'" + ", " + counter + ", " + "'" + name + "', " + "'" + nameid + "'" + ")");
                }



                divimg.appendChild(img);
                divcol.appendChild(pPrice);
                divButton.appendChild(button);
                divrow.appendChild(divcol);
                divrow.appendChild(divButton);
                divcaption.appendChild(h4);
                divcaption.appendChild(divrow);
                divthumbnail.appendChild(divimg);
                divthumbnail.appendChild(divcaption);
                divitem.appendChild(divthumbnail);
                document.getElementById("products").appendChild(divitem);


                counter++;

            });

            productCounter++;
            if (productCounter < 11) {
                orderData();
            }
            else {

                var items = document.getElementsByClassName("content_Snacks");
                for (var i = 0; i < items.length; i++) {
                    items[i].style.display = "none";
                }

                items = document.getElementsByClassName("content_Cleaning");
                for (var i = 0; i < items.length; i++) {
                    items[i].style.display = "none";
                }

                items = document.getElementsByClassName("content_Alcahol");
                for (var i = 0; i < items.length; i++) {
                    items[i].style.display = "none";
                }

                items = document.getElementsByClassName("content_Greengrocery");
                for (var i = 0; i < items.length; i++) {
                    items[i].style.display = "none";
                }

                items = document.getElementsByClassName("content_Meat");
                for (var i = 0; i < items.length; i++) {
                    items[i].style.display = "none";
                }

                items = document.getElementsByClassName("content_Breakfast");
                for (var i = 0; i < items.length; i++) {
                    items[i].style.display = "none";
                }

                items = document.getElementsByClassName("content_Foodsupply");
                for (var i = 0; i < items.length; i++) {
                    items[i].style.display = "none";
                }

                items = document.getElementsByClassName("content_Personelcare");
                for (var i = 0; i < items.length; i++) {
                    items[i].style.display = "none";
                }

                items = document.getElementsByClassName("content_Others");
                for (var i = 0; i < items.length; i++) {
                    items[i].style.display = "none";
                }

                items = document.getElementsByClassName("content_Readyfood");
                for (var i = 0; i < items.length; i++) {
                    items[i].style.display = "none";
                }

            }

        });

}
orderData();



function displayBtn(y) {
    if (document.querySelector(".content_" + products[y]).style.display == "none") {
        var items = document.getElementsByClassName("content_Snacks");
        for (var i = 0; i < items.length; i++) {
            items[i].style.display = "none";
        }

        items = document.getElementsByClassName("content_Cleaning");
        for (var i = 0; i < items.length; i++) {
            items[i].style.display = "none";
        }

        items = document.getElementsByClassName("content_Alcahol");
        for (var i = 0; i < items.length; i++) {
            items[i].style.display = "none";
        }

        items = document.getElementsByClassName("content_Drinks");
        for (var i = 0; i < items.length; i++) {
            items[i].style.display = "none";
        }

        items = document.getElementsByClassName("content_Greengrocery");
        for (var i = 0; i < items.length; i++) {
            items[i].style.display = "none";
        }

        items = document.getElementsByClassName("content_Meat");
        for (var i = 0; i < items.length; i++) {
            items[i].style.display = "none";
        }

        items = document.getElementsByClassName("content_Breakfast");
        for (var i = 0; i < items.length; i++) {
            items[i].style.display = "none";
        }

        items = document.getElementsByClassName("content_Foodsupply");
        for (var i = 0; i < items.length; i++) {
            items[i].style.display = "none";
        }

        items = document.getElementsByClassName("content_Personelcare");
        for (var i = 0; i < items.length; i++) {
            items[i].style.display = "none";
        }

        items = document.getElementsByClassName("content_Others");
        for (var i = 0; i < items.length; i++) {
            items[i].style.display = "none";
        }

        items = document.getElementsByClassName("content_Readyfood");
        for (var i = 0; i < items.length; i++) {
            items[i].style.display = "none";
        }

        items = document.getElementsByClassName("content_" + products[y]);
        for (var i = 0; i < items.length; i++) {
            items[i].removeAttribute("style");
        }

    }
    else {
        items = document.getElementsByClassName("content_" + products[y]);
        for (var i = 0; i < items.length; i++) {
            items[i].style.display = "none";
        }


    }
}






var storeUID;

firebase.database().ref("Market").child("Aymu").on("value", function (snapshot) {

    var childData = snapshot.val();
    storeUID = childData.nameid;
});

function addbtnKG(fprice, fname, farray, buttonID, nameid) {

    var array_access = farray;   // NUMBER IS THE ARRAY LIST
    var f_adet;
    var btn = document.getElementById(buttonID);

    f_adet = adetControlKG(array_access);


    function writeOrderData() {
        var pushKey = firebase.database().ref("Basket/" + userId + "/").push();
        var note = "";

        var getPush = pushKey.key;

        pushKey.update({
            notes: note,
            nameid: nameid,
            name: fname,
            ucret: String(fprice),
            quantity: f_adet,
            key: getPush,
            restid: storeUID,
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


function addbtn(fprice, fname, farray, buttonID, nameid) {


    var array_access = farray;   // NUMBER IS THE ARRAY LIST
    var f_adet;
    var btn = document.getElementById(buttonID);
    var note = "";

    f_adet = adetControl(array_access);   // TO SET THE ARRAY VALUE



    function writeOrderData() {
        var pushKey = firebase.database().ref("Basket/" + userId + "/").push();

        var getPush = pushKey.key;

        pushKey.update({
            notes: note,
            nameid: nameid,
            name: fname,
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


function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
