
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
apiKey: "AIzaSyCwciRr4FLVtnJTmYz6FFn-3wjka-hpCIE",
authDomain: "cartita-52492.firebaseapp.com",
projectId: "cartita-52492",
storageBucket: "cartita-52492.firebasestorage.app",
messagingSenderId: "713552809647",
appId: "1:713552809647:web:d5dea54a326773d3064e5a",
measurementId: "G-F4FJB3QZFN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
