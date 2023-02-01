import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAzk5UmvC0Hqs0oI-ihntt6_i7fORbbiIc",
  authDomain: "warechat-eb650.firebaseapp.com",
  projectId: "warechat-eb650",
  storageBucket: "warechat-eb650.appspot.com",
  messagingSenderId: "943695487596",
  appId: "1:943695487596:web:1d844830cfec2487482e49",
  measurementId: "G-VQ8CXRTGDG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export default { app, database };