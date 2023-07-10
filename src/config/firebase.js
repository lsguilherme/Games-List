import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyAl2lC7j-ifVyzwW5SrMoejJgD0KOrmkfc",
  authDomain: "gamestest-358dd.firebaseapp.com",
  databaseURL: "https://gamestest-358dd-default-rtdb.firebaseio.com",
  projectId: "gamestest-358dd",
  storageBucket: "gamestest-358dd.appspot.com",
  messagingSenderId: "903542816845",
  appId: "1:903542816845:web:621213293a52625fab5c04",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export default getFirestore(app);
