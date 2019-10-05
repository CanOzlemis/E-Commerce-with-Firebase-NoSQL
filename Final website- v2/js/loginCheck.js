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




firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
      var userId = firebase.auth().currentUser.uid;
          
      }
        else {
            
            window.location.href = "./login/index.html";
        }
    });
    


 document.getElementById('sign-out-button').addEventListener('click', function onSignOutClick() {
    firebase.auth().signOut();
     window.location.href = "./login/index.html";
  });

  function popup() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}