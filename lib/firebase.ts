// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDlyy_Tj6SQq1RUV27TYXCez8ao3qB8oOA",
    authDomain: "descabageek-a59ec.firebaseapp.com",
    projectId: "descabageek-a59ec",
    storageBucket: "descabageek-a59ec.firebasestorage.app",
    messagingSenderId: "715360735557",
    appId: "1:715360735557:web:54c25a2ffddf242fe8ae2c",
    measurementId: "G-82HKLY4GGJ"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

let analytics;
if (typeof window !== "undefined") {
    isSupported().then((yes) => yes && (analytics = getAnalytics(app)));
}

export { app, auth, analytics };