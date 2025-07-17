// Firebase initialization
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBf3NgxK93fkDr-eiQbnzZS7_eu8AvZv_g",
  authDomain: "fixnow-5fda8.firebaseapp.com",
  projectId: "fixnow-5fda8",
  storageBucket: "fixnow-5fda8.firebasestorage.appspot.com",
  messagingSenderId: "678194029142",
  appId: "1:678194029142:web:cd7c1cba6156eb27d391f7",
  measurementId: "G-C5PR3MWFJJ"
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}
const db = getFirestore(app);

export { db };
