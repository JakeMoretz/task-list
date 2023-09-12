// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClaAejr3E3iOajBUylce_ClkvXZ7z9H2Y",
  authDomain: "task-list-78b96.firebaseapp.com",
  projectId: "task-list-78b96",
  storageBucket: "task-list-78b96.appspot.com",
  messagingSenderId: "91272567483",
  appId: "1:91272567483:web:37d118fa15cfccb6ca679e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)
export const taskCollection = collection(database, "newTask")