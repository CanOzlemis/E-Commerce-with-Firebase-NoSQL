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





firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
          
      }
        else {
            
            window.location.href = "./login/index.html";
        }
    });
    


 document.getElementById('sign-out-button').addEventListener('click', function onSignOutClick() {
    firebase.auth().signOut();
     window.location.href = "./login/index.html";
  });





var query = firebase.database().ref("Market").orderByKey();
query.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      // key will be "ada" the first time and "alan" the second time
      var key = childSnapshot.key;
        
        var keyName = key.name;
        
        
      // childData will be the actual contents of the child
      var childData = childSnapshot.val();
      var storeName = childData.name;
      var storeID = childData.nameid;
      var storePic = childData.image;

      var div = document.getElementById("restContainer");
      var row = document.getElementById("containerRow");
      var col = document.createElement("div");
      col.setAttribute("class", "col-md-6 col-lg-4 text-center");
      var box = document.createElement("div");
      box.setAttribute("class", "box");
      box.style.background = "linear-gradient( rgba(0, 0, 0, 0.438), rgba(0, 0, 0, 0.438)), url(" + storePic + ")";
      var content = document.createElement("div");
      content.setAttribute("class", "box-content");
      var h1 = document.createElement("h1");
      h1.setAttribute("class", "tag-title");
      var strong = document.createElement("strong");
      var hr = document.createElement("hr");
      var p = document.createElement("p");
      var a = document.createElement("a");
      a.setAttribute("href", "market-" + storeID + ".html");
      var button = document.createElement("button");
      button.setAttribute("type", "button");
      button.setAttribute("class", "btn btn-elegant");



      strong.innerHTML = storeName;
      h1.appendChild(strong);
      p.innerHTML = storeName + " marketi görüntülemek için tıklayınız.....";
      button.innerHTML = storeName;
      a.appendChild(button);
      content.appendChild(h1);
      content.appendChild(hr);
      content.appendChild(p);
      content.appendChild(hr);
      content.appendChild(a);
      box.appendChild(content);
      col.appendChild(box);
      row.appendChild(col);  



  });
});
