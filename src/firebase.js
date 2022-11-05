import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCom4zdV5UmCduH4SRNsLBAKDfTKAPJ4Ds",
  authDomain: "chat-app-ce44a.firebaseapp.com",
  projectId: "chat-app-ce44a",
  storageBucket: "chat-app-ce44a.appspot.com",
  messagingSenderId: "841466173511",
  appId: "1:841466173511:web:aad3a47d830d0ac9227962",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { auth, storage, db };
