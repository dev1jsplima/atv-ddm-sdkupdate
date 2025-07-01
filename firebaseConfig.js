import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getFirestore, collection} from 'firebase/firestore'


// 1. create new project on firebase console
// 2. enable email and password auth provider in authentication
// 3. create a web app and copy the firebseConfigs below 

const firebaseConfig = {
  apiKey: "AIzaSyDbpT7QrlJlHhMk_Mt3Rqwx7212jPNA5vc",
  authDomain: "fir-chat-b6b61.firebaseapp.com",
  projectId: "fir-chat-b6b61",
  storageBucket: "fir-chat-b6b61.firebasestorage.app",
  messagingSenderId: "196347472214",
  appId: "1:196347472214:web:efbf3e8995113720fc4ef7",
  measurementId: "G-DZSFX0T4HP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { auth };

export const db = getFirestore(app);

export const usersRef = collection(db, 'users');
export const roomRef = collection(db, 'rooms');