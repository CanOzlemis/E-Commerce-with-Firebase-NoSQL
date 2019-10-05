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


document.getElementById('verification-code-form').style.display = 'none';
document.getElementById("login_div").style.display = 'block';
document.getElementById('signup').style.display = 'none';

var keepUserID;
var counter = 0;


window.onload = function () {
  // Listening for auth state changes.
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      window.location.href = "../index.html";

    }
    updateSignInButtonUI();
    updateVerificationCodeFormUI();


   


  });
  counter++;



  // Event bindings.
  document.getElementById('phone-number').addEventListener('keyup', updateSignInButtonUI);
  document.getElementById('phone-number').addEventListener('change', updateSignInButtonUI);
  document.getElementById('verification-code').addEventListener('keyup', updateVerifyCodeButtonUI);
  document.getElementById('verification-code').addEventListener('change', updateVerifyCodeButtonUI);
  document.getElementById('verification-code-form').addEventListener('submit', onVerifyCodeSubmit);
  document.getElementById('cancel-verify-code-button').addEventListener('click', cancelVerification);

  // [START appVerifier]
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
    'size': 'invisible',
    'callback': function (response) {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
      onSignInSubmit();
    }
  });
  // [END appVerifier]

  recaptchaVerifier.render().then(function (widgetId) {
    window.recaptchaWidgetId = widgetId;
    updateSignInButtonUI();
  });
};



/**
 * Function called when clicking the Login/Logout button.
 */
function onSignInSubmit() {
  if (isPhoneNumberValid()) {
    window.signingIn = true;
    updateSignInButtonUI();
    var phoneNumber = getPhoneNumberFromUserInput();
    var appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        window.signingIn = false;
        updateSignInButtonUI();
        updateVerificationCodeFormUI();
        updateVerifyCodeButtonUI();
      }).catch(function (error) {
        // Error; SMS not sent
        console.error('Error during signInWithPhoneNumber', error);
        window.signingIn = false;
        updateSignInButtonUI();
      });
  }
}

/**
 * Function called when clicking the "Verify Code" button.
 */
function onVerifyCodeSubmit(e) {
  e.preventDefault();
  if (!!getCodeFromUserInput()) {
    window.verifyingCode = true;
    updateVerifyCodeButtonUI();
    var code = getCodeFromUserInput();
    confirmationResult.confirm(code).then(function (result) {
      // User signed in successfully.
      var user = result.user;
      window.verifyingCode = false;
      window.confirmationResult = null;
      updateVerificationCodeFormUI();
    }).catch(function (error) {
      // User couldn't sign in (bad verification code?)
      console.error('Error while checking the verification code', error);
      window.verifyingCode = false;
      updateSignInButtonUI();
      updateVerifyCodeButtonUI();
    });
  }
}


/**
 * Cancels the verification code input.
 */
function cancelVerification(e) {
  e.preventDefault();
  window.confirmationResult = null;
  updateVerificationCodeFormUI();
  updateSignInFormUI();
}

function updateSignInFormUI() {
  document.getElementById('verification-code-form').style.display = 'none';
  document.getElementById("login_div").style.display = 'block';
  document.getElementById('signup').style.display = 'none';

}

/**
 * Signs out the user when the sign-out button is clicked.
 */
function onSignOutClick() {
  firebase.auth().signOut();
}

/**
 * Reads the verification code from the user input.
 */
function getCodeFromUserInput() {
  return document.getElementById('verification-code').value;
}

/**
 * Reads the phone number from the user input.
 */
function getPhoneNumberFromUserInput() {
  return document.getElementById('phone-number').value;
}

/**
 * Returns true if the phone number is valid.
 */
function isPhoneNumberValid() {
  var pattern = /^\+[0-9\s\-\(\)]+$/;
  var phoneNumber = getPhoneNumberFromUserInput();
  return phoneNumber.search(pattern) !== -1;
}

/**
 * Re-initializes the ReCaptacha widget.
 */
function resetReCaptcha() {
  if (typeof grecaptcha !== 'undefined'
    && typeof window.recaptchaWidgetId !== 'undefined') {
    grecaptcha.reset(window.recaptchaWidgetId);
  }
}

/**
 * Updates the Sign-in button state depending on ReCAptcha and form values state.
 */
function updateSignInButtonUI() {
  document.getElementById('sign-in-button').disabled =
    !isPhoneNumberValid()
    || !!window.signingIn;
}

/**
 * Updates the Verify-code button state depending on form values state.
 */
function updateVerifyCodeButtonUI() {
  document.getElementById('verify-code-button').disabled =
    !!window.verifyingCode
    || !getCodeFromUserInput();
}


/**
 * Updates the state of the Verify code form.
 */
function updateVerificationCodeFormUI() {
  if (!firebase.auth().currentUser && window.confirmationResult) {
    document.getElementById('verification-code-form').style.display = 'block';
    document.getElementById('login_div').style.display = 'none';
  } else {
    document.getElementById('verification-code-form').style.display = 'none';
    document.getElementById('login_div').style.display = 'block';
  }
}