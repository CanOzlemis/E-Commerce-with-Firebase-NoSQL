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

document.getElementById("burayaBakma").style.display = "none";
var childData;
var price;
var name;
var nameid;
var quantity;
var note;
var restName;


var restid;
var userId;
var counter = 0;
var userPhoneNo;
var totalPrice = 0;

var chckIfExists = [];

var displayp = document.createElement("h2");
var displayTotal = document.getElementById("totalPrice");
displayTotal.innerHTML = "";
displayp.innerHTML = "Toplam " + totalPrice + " TL";
displayTotal.appendChild(displayp);


restName = 0;
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        userPhoneNo = user.phoneNumber;
        userId = firebase.auth().currentUser.uid;

        var query = firebase.database().ref("Basket/" + userId).orderByKey();
        query.once("value")
            .then(function (snapshot) {
                snapshot.forEach(function (childSnapshot) {



                    // childData will be the actual contents of the child
                    childData = childSnapshot.val();
                    price = childData.ucret;
                    name = childData.name;
                    nameid = childData.nameid;
                    quantity = childData.quantity;
                    note = childData.notes;
                    restName = 0;
                    var key = childData.key;
                    restid = childData.restid;

                    var keepquantity = document.createElement("p");
                    var keepname = document.createElement("p");
                    var keeprestid = document.createElement("p");
                    var keepprice = document.createElement("p");
                    var keepnameid = document.createElement("p");
                    keepnameid.setAttribute("id", "keepnameid" + counter);
                    keepprice.setAttribute("id", "keepprice" + counter);
                    keepquantity.setAttribute("id", "keepquantity" + counter);
                    keepname.setAttribute("id", "keepname" + counter);
                    keeprestid.setAttribute("id", "keeprestid" + counter);
                    keepnameid.innerHTML = nameid;
                    keepquantity.innerHTML = quantity;
                    keepname.innerHTML = name;
                    keeprestid.innerHTML = restid;
                    keepprice.innerHTML = price;
                    document.getElementById("burayaBakma").appendChild(keeprestid);
                    document.getElementById("burayaBakma").appendChild(keepprice);
                    document.getElementById("burayaBakma").appendChild(keepquantity);
                    document.getElementById("burayaBakma").appendChild(keepname);
                    document.getElementById("burayaBakma").appendChild(keepnameid);


                    var displayp = document.createElement("h2");
                    var displayTotal = document.getElementById("totalPrice");
                    displayTotal.innerHTML = "";
                    totalPrice = totalPrice + (quantity * price);

                    displayp.innerHTML = "Toplam " + totalPrice + " TL";
                    displayTotal.appendChild(displayp);

                    var pRestName = document.createElement("p");


                    firebase.database().ref("Restaurant").orderByChild(restid).on('value', function (snapshot) {
                        snapshot.forEach(function (childSnapshot) {

                            var key = childSnapshot.key;
                            var childData = childSnapshot.val();

                            pRestName.innerHTML = childData.name;


                        });

                    });


                    var container = document.getElementById("infoContainer");
                    var div = document.createElement("div");
                    div.setAttribute("class", "jumbotron");
                    div.setAttribute("id", counter);
                    var h1 = document.createElement("h1");
                    h1.innerHTML = name + ", " + quantity + " adet";
                    var pNote = document.createElement("p");
                    pNote.innerHTML = "Not = " + note;
                    pNote.setAttribute("id", "note" + counter);
                    var pPhone = document.createElement("p");
                    pPhone.innerHTML = userPhoneNo;
                    var writePrice = document.createElement("p");
                    writePrice.innerHTML = "Adet başı fiyat = " + price + " TL";
                    var closeBtn = document.createElement("button");
                    closeBtn.setAttribute("type", "button");
                    closeBtn.setAttribute("class", "close");
                    closeBtn.setAttribute("onclick", "removeOrder(" + "'" + key + "', " + counter + ")");
                    var span = document.createElement("span");
                    span.setAttribute("aria-hidden", "true");
                    span.innerHTML = "&times";
                    closeBtn.appendChild(span);
                    var hr = document.createElement("hr");
                    var writeRestID = document.createElement("p");
                    writeRestID.innerHTML = restid;

                    div.appendChild(closeBtn);
                    div.appendChild(h1);
                    div.appendChild(hr);
                    div.appendChild(pNote);
                    div.appendChild(writePrice);
                    div.appendChild(pPhone);
                    div.appendChild(writeRestID);
                    container.appendChild(div);

                    chckIfExists[counter] = 1;
                    counter++;





                });
            });




    }
    else {

        window.location.href = "./login/index.html";
    }
});




document.getElementById('sign-out-button').addEventListener('click', function onSignOutClick() {
    firebase.auth().signOut();
    window.location.href = "./login/index.html";
});



function removeOrder(key, number) {

    firebase.database().ref("Basket/" + userId + "/" + key).remove();
    var childName = document.getElementById(number);
    var removeNameid = document.getElementById("keepnameid" + number);
    var removePrice = document.getElementById("keepprice" + number);
    var removeQuantity = document.getElementById("keepquantity" + number);
    var removeName = document.getElementById("keepname" + number);
    var removeRestid = document.getElementById("keeprestid" + number);
    var getQuantity = document.getElementById("keepquantity" + number).innerHTML;
    var getPrice = document.getElementById("keepprice" + number).innerHTML;

    document.getElementById("infoContainer").removeChild(childName);
    document.getElementById("burayaBakma").removeChild(removeNameid);
    document.getElementById("burayaBakma").removeChild(removePrice);
    document.getElementById("burayaBakma").removeChild(removeQuantity);
    document.getElementById("burayaBakma").removeChild(removeName);
    document.getElementById("burayaBakma").removeChild(removeRestid);


    var displayp = document.createElement("h2");
    var displayTotal = document.getElementById("totalPrice");
    displayTotal.innerHTML = "";
    totalPrice = totalPrice - (getQuantity * getPrice);

    displayp.innerHTML = "Toplam " + totalPrice + " TL";

    displayTotal.appendChild(displayp);

    chckIfExists[number] = 0;

}




var button = document.querySelector('.button');
var buttonText = document.querySelector('.tick');

const tickMark = "<svg width=\"29\" height=\"45\" viewBox=\"0 0 58 45\" xmlns=\"http://www.w3.org/2000/svg\"><path fill=\"#fff\" fill-rule=\"nonzero\" d=\"M19.11 44.64L.27 25.81l5.66-5.66 13.18 13.18L52.07.38l5.65 5.65\"/></svg>";
buttonText.innerHTML = "Gönder";


button.addEventListener('click', function () {




    var query = firebase.database().ref("Basket/" + userId).orderByKey();
    query.once("value")
        .then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {

                childData = childSnapshot.val();
                price = childData.ucret;
                name = childData.name;
                nameid = childData.nameid;
                quantity = childData.quantity;
                note = childData.notes;
                restName = 0;

            });
        });


    var tick = this;




    if ($('#infoContainer').text().length != 0) {

        var orderLocation = prompt("Lütfen adresi giriniz...");

        if ((orderLocation.length > 2) && (isNaN(orderLocation))) {

            function writeUserData() {
                for (var i = 0; i < counter; i++) {
                    if (chckIfExists[i] == 1) {
                        console.log("done : " + i);

                        note = document.getElementById("note" + i).innerHTML;
                        name = document.getElementById("keepname" + i).innerHTML;
                        quantity = document.getElementById("keepquantity" + i).innerHTML;
                        price = document.getElementById("keepprice" + i).innerHTML;
                        restid = document.getElementById("keeprestid" + i).innerHTML;
                        nameid = document.getElementById("keepnameid" + i).innerHTML;
                        firebase.database().ref("Order/" + userId).push().update({




                            adress: orderLocation,
                            name: name,
                            note: note,
                            nameid: nameid,
                            phone: userPhoneNo,
                            quantity: quantity,
                            restid: restid,
                            ucret: price,
                            status: "0",


                        }, function (error) {
                            if (error) {
                                alert("Siparişiniz gönderilemedi, lütfen tekrar deneyin");
                            }
                        });
                    }
                }
                buttonText.innerHTML = tickMark;
                tick.classList.toggle('button__circle');

                for (var i = 0; i < counter; i++) {
                    if (chckIfExists[i] == 1) {
                        var childName = document.getElementById(i);
                        document.getElementById("infoContainer").removeChild(childName);
                    }

                }

                firebase.database().ref("Basket/" + userId).remove();
                var displayp = document.createElement("h2");
                var displayTotal = document.getElementById("totalPrice");
                displayTotal.innerHTML = "";
                totalPrice = 0;
                displayp.innerHTML = "Toplam " + totalPrice + " TL";

                displayTotal.appendChild(displayp);
                var x = document.getElementById("snackbar");
                x.innerHTML = "Siparişiniz gönderildi";
                x.className = "show";
                setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
            }

            writeUserData();

        } else { alert("Lütfen adresi doğru doldurunuz!"); }
    }
    else {
        var x = document.getElementById("snackbar");
        x.innerHTML = "Sepetiniz boş";
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    }


});


