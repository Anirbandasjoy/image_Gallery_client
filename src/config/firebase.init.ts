// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCbMYY27leFhOndB4G72j2JGjiIxdpz8cE",
  authDomain: "image-gallery-c4809.firebaseapp.com",
  projectId: "image-gallery-c4809",
  storageBucket: "image-gallery-c4809.appspot.com",
  messagingSenderId: "132076417529",
  appId: "1:132076417529:web:ee03d21b6f28763fa80d28",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
