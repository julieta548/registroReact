import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAr6pNE3rcovrrwxJuBgDEvpJob-r_hwnM",
  authDomain: "percubateristas.firebaseapp.com",
  databaseURL: "https://percubateristas-default-rtdb.firebaseio.com",
  projectId: "percubateristas",
  storageBucket: "percubateristas.appspot.com",
  messagingSenderId: "668127969854",
  appId: "1:668127969854:web:ef32029aff1b2ea573476f"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);