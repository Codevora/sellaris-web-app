// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
 apiKey: "AIzaSyCPv388uU-y-nxRv8KtsBMbowOlMig26ts",
 authDomain: "sellaris-web-app.firebaseapp.com",
 projectId: "sellaris-web-app",
 storageBucket: "sellaris-web-app.firebasestorage.app",
 messagingSenderId: "882236688299",
 appId: "1:882236688299:web:8600caacac42755a8334ee",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export {app, db, db as firestore, storage};
