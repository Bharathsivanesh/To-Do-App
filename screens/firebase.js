import { getApps, initializeApp } from "firebase/app";

import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDTT-_oSMMHOPx40VD1v9FAsbvS-T1TzqM",
  authDomain: "to-do-14eee.firebaseapp.com",
  projectId: "to-do-14eee",
  storageBucket: "to-do-14eee.firebasestorage.app",
  messagingSenderId: "756656362036",
  appId: "1:756656362036:web:f6cfbf3710cb0951c27061",
};
const app =getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const firestore = getFirestore(app);
export { auth, firestore };
