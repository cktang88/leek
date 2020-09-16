import firebase from "firebase/app";
import "firebase/auth";
import env from "./vars";

// Initialize Firebase
const firebaseConfig = {
    apiKey: env.LEEK_FIREBASE_API_KEY,
    authDomain: env.LEEK_FIREBASE_AUTH_DOMAIN,
    databaseURL: env.LEEK_FIREBASE_DATABASE_URL,
    projectId: env.LEEK_FIREBASE_PROJECT_ID,
    storageBucket: env.LEEK_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.LEEK_FIREBASE_MESSAGING_SENDER_ID,
    appId: env.LEEK_FIREBASE_APP_ID,
    measurementId: env.LEEK_FIREBASE_MEASUREMENT_ID,
};

let firebaseCache;

const getFirebase = () => {
    if (firebaseCache) {
        return firebaseCache
    }

    firebase.initializeApp(firebaseConfig);
    firebaseCache = firebase;

    return firebaseCache;
};


export default getFirebase;
