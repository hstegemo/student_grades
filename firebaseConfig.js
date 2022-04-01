// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export { auth, db };

/*
// Firebase rules: 
// Firebase in production mode (restricted / read only)
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {

      allow read, write: if false;
    }
  }
}

// Firebase in test mode (unrestricted / read/write)
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if
          request.time < timestamp.date(2022, 4, 22);
    }
  }
}


*/