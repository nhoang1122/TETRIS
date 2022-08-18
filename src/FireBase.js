// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyDSelfxo2K0AAoq0im4wRg1DMDOENL5M",
  authDomain: "tetris-d1bf0.firebaseapp.com",
  projectId: "tetris-d1bf0",
  storageBucket: "tetris-d1bf0.appspot.com",
  messagingSenderId: "795027278550",
  appId: "1:795027278550:web:26fd111c397847ebb69777"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;