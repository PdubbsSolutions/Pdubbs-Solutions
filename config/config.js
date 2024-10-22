var admin = require("firebase-admin");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pdubbs-final-default-rtdb.firebaseio.com"
});


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwwveYRqdPTsnLosZJzR8L-jk8DjzwvLo",
  authDomain: "pdubbs-final.firebaseapp.com",
  databaseURL: "https://pdubbs-final-default-rtdb.firebaseio.com",
  projectId: "pdubbs-final",
  storageBucket: "pdubbs-final.appspot.com",
  messagingSenderId: "980654735004",
  appId: "1:980654735004:web:9346cd6edee1080d203759"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig, "Pdubbs Solutions");