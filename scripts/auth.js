
  (function(){
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBw8Jaoa_aoVqKWBv-AVTc2U61cUhn6Ews",
    authDomain: "firstproject-4622a.firebaseapp.com",
    databaseURL: "https://firstproject-4622a.firebaseio.com",
    projectId: "firstproject-4622a",
    storageBucket: "firstproject-4622a.appspot.com",
    messagingSenderId: "864749837314"
  };
  firebase.initializeApp(config);
//   Get elements
const txtMail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
const btnSignup = document.getElementById('btnSignUp');
const btnLogout = document.getElementById('btnLogout');

btnLogin.addEventListener('click', e =>{
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    // Sign in firebase promise
    const promise = auth.signInWithEmailAndPassword(email,pass);
    promise.catch(e=>console.log('error', e.message));
    
});

// add signup event
btnSignup.addEventListener('click', e=>{
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    // Sign in firebase promise
    const promise = auth.createUserWithEmailAndPassword(email,pass);
    promise.catch(e=>console.log('error', e.message));
    
});
// log out user event
btnLogout.addEventListener('click', e=>{
    firebase.auth().signOut();
});


// add a realtime listener
firebase.auth().onAuthStateChanged(firebaseUser =>{
    if(firebaseUser){
        console.log('user', firebaseUser );
    } else {
        console.log('not logged in');
    }
});

}());











// auth.createUserWithEmailAndPassword(email,pass);
