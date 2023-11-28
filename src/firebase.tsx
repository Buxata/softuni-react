// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAfKBA7Ci45FplTHe2Hphs-QhU4HyOb-c4",
  authDomain: "buxata-9028b.firebaseapp.com",
  projectId: "buxata-9028b",
  storageBucket: "buxata-9028b.appspot.com",
  messagingSenderId: "854165168409",
  appId: "1:854165168409:web:4ba2eac49147988aec2588",
  measurementId: "G-R004C13L1W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore = getFirestore(app);