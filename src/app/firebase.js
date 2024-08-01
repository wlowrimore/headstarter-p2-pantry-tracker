// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhqQdCZSQRrC1_a5JFXI5QcXwIDvO846w",
  authDomain: "fellowship-proj2-pantry-app.firebaseapp.com",
  projectId: "fellowship-proj2-pantry-app",
  storageBucket: "fellowship-proj2-pantry-app.appspot.com",
  messagingSenderId: "950838272070",
  appId: "1:950838272070:web:62024e3646a6ef1789ea47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
