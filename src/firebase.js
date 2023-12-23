import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore,collection} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyALopf2Y4UY04lZZKWoy95f-od1S0UgF2o",
  authDomain: "todo-dddf5.firebaseapp.com",
  projectId: "todo-dddf5",
  storageBucket: "todo-dddf5.appspot.com",
  messagingSenderId: "904357748189",
  appId: "1:904357748189:web:6f4004d9243a14def1aa34",
  measurementId: "G-8BVW4R7KPC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app);
export const taskCollection =collection(db,"tasks")
const analytics = getAnalytics(app);