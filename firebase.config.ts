
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeV9POyKPmQjWHqtQRXgsw6wKHKwvhrps",
  authDomain: "ridehub-bf542.firebaseapp.com",
  projectId: "ridehub-bf542",
  storageBucket: "ridehub-bf542.appspot.com",
  messagingSenderId: "1030009237568",
  appId: "1:1030009237568:web:9fe751eb09ea4be6a6afa5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

 const auth = getAuth(app);
 export default auth;