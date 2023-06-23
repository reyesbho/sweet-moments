// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYGQvRYot3rirztgeqrolQb5gSK4dinWg",
  authDomain: "sweetmoments-17dc5.firebaseapp.com",
  databaseURL: "https://sweetmoments-17dc5-default-rtdb.firebaseio.com",
  projectId: "sweetmoments-17dc5",
  storageBucket: "sweetmoments-17dc5.appspot.com",
  messagingSenderId: "482000961253",
  appId: "1:482000961253:web:78ec7d5c92f8b0c89b9e0c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
