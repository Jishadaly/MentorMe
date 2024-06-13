// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyA4kUmaoKmQAAe_LKJwpt7pe-x6wI7S2ww",
  authDomain: "mentorme-cfcdc.firebaseapp.com",
  projectId: "mentorme-cfcdc",
  storageBucket: "mentorme-cfcdc.appspot.com",
  messagingSenderId: "930419930747",
  appId: "1:930419930747:web:712827fd069d13d89114de",
  measurementId: "G-LHEL4R3RWB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth , provider};