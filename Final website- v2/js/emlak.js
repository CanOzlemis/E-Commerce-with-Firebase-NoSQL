document.addEventListener('contextmenu', event => event.preventDefault());





var config = {
    apiKey: "AIzaSyCJ-sod9xxMtkFM4ntuUYMkYhPlISv8TEg",
    authDomain: "lau-cepte.firebaseapp.com",
    databaseURL: "https://lau-cepte.firebaseio.com",
    projectId: "lau-cepte",
    storageBucket: "lau-cepte.appspot.com",
    messagingSenderId: "767239100059"
};
firebase.initializeApp(config);


var userId;

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
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

var emlakForm = document.getElementById("createEmlak");
var allPosts = document.getElementById("allPosts");
var container = document.querySelector(".container");
container.style.backgroundColor = "#343a40";
emlakForm.style.display = "none";


function displayform() {

    if (emlakForm.style.display == "none") {
        emlakForm.style.display = "block";
        allPosts.style.display = "none";
        container.style.backgroundColor = "white";

    }
    else {
        emlakForm.style.display = "none";
        allPosts.style.display = "block";
        container.style.backgroundColor = "#343a40";
    }



}





var writecounter = 0;

var query = firebase.database().ref("Emlak").orderByKey();
query.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {

        var childData = childSnapshot.val();

        var writeContact = childData.contact;
        var writeInfo = childData.info;
        var writePic0 = childData.pic0;
        var writePic1 = childData.pic1;
        var writePic2 = childData.pic2;
        var writePic3 = childData.pic3;
        var writePic4 = childData.pic4;
        var writePrice = childData.price;
        var writeRoom = childData.room;
        var writeTitle = childData.title;



        var card = document.createElement("div");
        card.setAttribute("class", "card");
        var fluid = document.createElement("div");
        fluid.setAttribute("class", "container-fluid");
        var wrapper = document.createElement("div");
        wrapper.setAttribute("class", "wrapper row");
        var preview = document.createElement("div");
        preview.setAttribute("class", "preview col-md-6");
        var preview_pic = document.createElement("div");
        preview_pic.setAttribute("class", "preview-pic tab-content");

        var picdiv1 = document.createElement("div");
        picdiv1.setAttribute("class", "tab-pane active");
        picdiv1.setAttribute("id", "pic-1" + writecounter);
        var img1 = document.createElement("img");
        img1.setAttribute("src", writePic0);

        var picdiv2 = document.createElement("div");
        picdiv2.setAttribute("class", "tab-pane");
        picdiv2.setAttribute("id", "pic-2" + writecounter);
        var img2 = document.createElement("img");
        img2.setAttribute("src", writePic1);

        var picdiv3 = document.createElement("div");
        picdiv3.setAttribute("class", "tab-pane");
        picdiv3.setAttribute("id", "pic-3" + writecounter);
        var img3 = document.createElement("img");
        img3.setAttribute("src", writePic2);

        var picdiv4 = document.createElement("div");
        picdiv4.setAttribute("class", "tab-pane");
        picdiv4.setAttribute("id", "pic-4" + writecounter);
        var img4 = document.createElement("img");
        img4.setAttribute("src", writePic3);

        var picdiv5 = document.createElement("div");
        picdiv5.setAttribute("class", "tab-pane");
        picdiv5.setAttribute("id", "pic-5" + writecounter);
        var img5 = document.createElement("img");
        img5.setAttribute("src", writePic4);

        var ul = document.createElement("ul");
        ul.setAttribute("class", "preview-thumbnail nav nav-tabs");

        var li1 = document.createElement("li");
        li1.setAttribute("class", "active");
        var a1 = document.createElement("a");
        a1.setAttribute("data-target", "#pic-1" + writecounter);
        a1.setAttribute("data-toggle", "tab");
        var img11 = document.createElement("img");
        img11.setAttribute("src", writePic0);


        var li2 = document.createElement("li");
        var a2 = document.createElement("a");
        a2.setAttribute("data-target", "#pic-2" + writecounter);
        a2.setAttribute("data-toggle", "tab");
        var img12 = document.createElement("img");
        img12.setAttribute("src", writePic1);

        var li3 = document.createElement("li");
        var a3 = document.createElement("a");
        a3.setAttribute("data-target", "#pic-3" + writecounter);
        a3.setAttribute("data-toggle", "tab");
        var img13 = document.createElement("img");
        img13.setAttribute("src", writePic2);

        var li4 = document.createElement("li");
        var a4 = document.createElement("a");
        a4.setAttribute("data-target", "#pic-4" + writecounter);
        a4.setAttribute("data-toggle", "tab");
        var img14 = document.createElement("img");
        img14.setAttribute("src", writePic3);

        var li5 = document.createElement("li");
        var a5 = document.createElement("a");
        a5.setAttribute("data-target", "#pic-5" + writecounter);
        a5.setAttribute("data-toggle", "tab");
        var img15 = document.createElement("img");
        img15.setAttribute("src", writePic4);


        var details = document.createElement("div");
        details.setAttribute("class", "details col-md-6");

        var productTitle = document.createElement("h3");
        productTitle.setAttribute("class", "product-title");
        productTitle.innerHTML = writeTitle;
        var productDescription = document.createElement("p");
        productDescription.setAttribute("class", "product-description");
        productDescription.innerHTML = writeInfo;

        var productRoomNo = document.createElement("h4");
        productRoomNo.setAttribute("class", "price");
        productRoomNo.innerHTML = "Oda sayısı: ";
        var spanRoom = document.createElement("span");
        spanRoom.innerHTML = writeRoom;

        var productPrice = document.createElement("h4");
        productPrice.setAttribute("class", "price");
        productPrice.innerHTML = "Fiyat: ";
        var spanPrice = document.createElement("span");
        spanPrice.innerHTML = writePrice + " TL";

        var prodcutContact = document.createElement("p");
        prodcutContact.innerHTML = "İletişim: " + writeContact;

        picdiv1.appendChild(img1);
        picdiv2.appendChild(img2);
        picdiv3.appendChild(img3);
        picdiv4.appendChild(img4);
        picdiv5.appendChild(img5);
        preview_pic.appendChild(picdiv1);
        preview_pic.appendChild(picdiv2);
        preview_pic.appendChild(picdiv3);
        preview_pic.appendChild(picdiv4);
        preview_pic.appendChild(picdiv5);

        a1.appendChild(img11);
        a2.appendChild(img12);
        a3.appendChild(img13);
        a4.appendChild(img14);
        a5.appendChild(img15);
        li1.appendChild(a1);
        li2.appendChild(a2);
        li3.appendChild(a3);
        li4.appendChild(a4);
        li5.appendChild(a5);
        ul.appendChild(li1);
        ul.appendChild(li2);
        ul.appendChild(li3);
        ul.appendChild(li4);
        ul.appendChild(li5);

        productPrice.appendChild(spanPrice);
        productRoomNo.appendChild(spanRoom);
        details.appendChild(productTitle);
        details.appendChild(productDescription);
        details.appendChild(productRoomNo);
        details.appendChild(productPrice);
        details.appendChild(prodcutContact);

        preview.appendChild(preview_pic);
        preview.appendChild(ul);
        wrapper.appendChild(preview);
        wrapper.appendChild(details);
        fluid.appendChild(wrapper);
        card.appendChild(fluid);
        allPosts.appendChild(card);
        




        writecounter++;
    });
});














const storageService = firebase.storage();
const storageRef = storageService.ref("emlak");

document.querySelector('.file-submit').addEventListener('click', handleFileUploadSubmit);


var filesLength = 0;
var selectedFile = [];

document.getElementById('fileinput').addEventListener('change', function () {
    filesLength = this.files.length;
    for (var i = 0; i < this.files.length; i++) {
        var file = this.files[i];
        selectedFile[i] = this.files[i];
        // This code is only for demo ...

    }

}, false);


var clearPic = 0;
var uploadfiles = document.querySelector('#fileinput');

uploadfiles.addEventListener('change', function () {
    var files = this.files;


    var gallery = document.getElementById("gallery");
    var thumb = document.createElement("div");
    thumb.classList.add('thumbnail');
    thumb.setAttribute("id", "pictureThumb");

    if (clearPic) {

        thumb.classList.add('thumbnail');
        while (gallery.firstChild) {
            gallery.removeChild(gallery.firstChild);
        }
        $('.thumbnail').remove();
    }




    for (var i = 0; i < files.length; i++) {
        previewImage(this.files[i]);
    }


}, false);



function handleFileUploadSubmit(e) {

    var title = document.getElementById("title_input").value;
    var price = document.getElementById("price_input").value;
    var room = document.getElementById("room_input").value;
    var contact = document.getElementById("contact_input").value;
    var info = document.getElementById("info_input").value;
    var submitBtn = document.getElementById("btnSubmit");


    submitBtn.innerHTML = "Bilgileriniz gönderiliyor....";
    submitBtn.disabled = true;


    function writeUserData() {
        console.log("writeUserData");

        submitBtn.innerHTML = "Bilgileriniz gönderiliyor....";
        firebase.database().ref('Emlak/' + userId).update({

            title: title,
            price: price,
            room: room,
            contact: contact,
            info: info,

        }, function (error) {
            if (error) {

                submitBtn.innerHTML = "HATA";
                alert("Data yazarken hata oluştu, lütfen tekrar deneyiniz");
                submitBtn.disabled = false;

            } else {
                submitBtn.innerHTML = "Tamamlandı";
                console.log("Data is written");
                return true;

            }
        });

    }



    function writePictureData() {
        submitBtn.innerHTML = "Resimler yükleniyor...";
        console.log("writePictureData");




        for (var abc = 0; abc < 5; abc++) {
            var deletePreviousTask = storageRef.child(userId + "/" + "id" + abc);
            deletePreviousTask.delete().then(function () {
                console.log("previous data has been deleted");
            }).catch(function (error) {
                console.log("Error while deleting previous data!!!!");

            });

        }



        for (var i = 0; i < filesLength; i++) {

            var uploadTask = storageRef.child(userId + "/" + "id" + i).put(selectedFile[i]);
            uploadTask;

        }




        uploadTask.on('state_changed', (snapshot) => {

            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            // Observe state change events such as progress, pause, and resume
        }, (error) => {
            // Handle unsuccessful uploads
            submitBtn.innerHTML = "HATA";
            alert("Resimleri yüklerken hata oluştu, lütfen tekrar deneyin");

            submitBtn.disabled = false;
            return;
        }, () => {
            var keepLink0;
            var keepLink1;
            var keepLink2;
            var keepLink3;
            var keepLink4;


            function getLinks(u, url) {

                firebase.database().ref('Emlak/' + userId).update({
                    pic0: "",
                    pic1: "",
                    pic2: "",
                    pic3: "",
                    pic4: "",
                }, function (error) {
                    if (error) { console.log("error while writing link"); }
                });

                setTimeout(() => {


                    switch (u) {
                        case 0:
                            keepLink0 = url;
                            console.log(keepLink0);
                            firebase.database().ref('Emlak/' + userId).update({
                                pic0: keepLink0,
                            }, function (error) {
                                if (error) { console.log("error while writing link"); }
                            });
                            break;

                        case 1:
                            keepLink1 = url;
                            console.log(keepLink1);
                            firebase.database().ref('Emlak/' + userId).update({
                                pic1: keepLink1,
                            }, function (error) {
                                if (error) { console.log("error while writing link"); }
                            });
                            break;

                        case 2:
                            keepLink2 = url;
                            console.log(keepLink2);
                            firebase.database().ref('Emlak/' + userId).update({
                                pic2: keepLink2,
                            }, function (error) {
                                if (error) { console.log("error while writing link"); }
                            });
                            break;

                        case 3:
                            keepLink3 = url;
                            console.log(keepLink3);
                            firebase.database().ref('Emlak/' + userId).update({
                                pic3: keepLink3,
                            }, function (error) {
                                if (error) { console.log("error while writing link"); }
                            });
                            break;

                        case 4:
                            keepLink4 = url;
                            console.log(keepLink4);
                            firebase.database().ref('Emlak/' + userId).update({
                                pic4: keepLink4,
                            }, function (error) {
                                if (error) { console.log("error while writing link"); }
                            });
                            break;
                        default:
                            console.log("switch default");
                            break;
                    }
                }, 2000);
            }





            function something(url, counterU) {
                getLinks(counterU, url);
            }




            storageRef.child(userId + "/" + "id" + 0).getDownloadURL().then(function (url) {
                something(url, 0);
            }).catch(function (error) {
                // Handle any errors
                console.log("THERE WAS AN ERROR WHILE RETRIEVING LINKS");
            });

            storageRef.child(userId + "/" + "id" + 1).getDownloadURL().then(function (url) {
                something(url, 1);
            }).catch(function (error) {
                // Handle any errors
                console.log("THERE WAS AN ERROR WHILE RETRIEVING LINKS");
            });

            storageRef.child(userId + "/" + "id" + 2).getDownloadURL().then(function (url) {
                something(url, 2);
            }).catch(function (error) {
                // Handle any errors
                console.log("THERE WAS AN ERROR WHILE RETRIEVING LINKS");
            });

            storageRef.child(userId + "/" + "id" + 3).getDownloadURL().then(function (url) {
                something(url, 3);
            }).catch(function (error) {
                // Handle any errors
                console.log("THERE WAS AN ERROR WHILE RETRIEVING LINKS");
            });

            storageRef.child(userId + "/" + "id" + 4).getDownloadURL().then(function (url) {
                something(url, 4);
            }).catch(function (error) {
                // Handle any errors
                console.log("THERE WAS AN ERROR WHILE RETRIEVING LINKS");
            });



            // Do something once upload is complete
            submitBtn.innerHTML = "Tamamlandı";
            console.log('success');
        });

    }



    if ((filesLength == 0) || (filesLength > 5)) {

        alert("Maximum 5, minimum 1 fotoğraf atabilirsiniz");
        window.location.href = "./emlak.html";


    } else {
        writePictureData();
    }
    writeUserData();

}


function previewImage(file) {


    clearPic = 1;

    var galleryId = "gallery";

    var gallery = document.getElementById(galleryId);
    var imageType = /image.*/;

    if (!file.type.match(imageType)) {
        throw "Dosya fotoğraf olmalı!";
    }

    var thumb = document.createElement("div");
    thumb.classList.add('thumbnail'); // Add the class thumbnail to the created div

    var img = document.createElement("img");
    img.file = file;
    thumb.appendChild(img);
    gallery.appendChild(thumb);

    // Using FileReader to display the image content
    var reader = new FileReader();
    reader.onload = (function (aImg) { return function (e) { aImg.src = e.target.result; }; })(img);
    reader.readAsDataURL(file);

}









