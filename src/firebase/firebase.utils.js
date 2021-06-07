import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDUXMxtE8MLC4uZ72wZbg9qg7lJcYsgPuE",
  authDomain: "crwn-clothing-db-a2867.firebaseapp.com",
  projectId: "crwn-clothing-db-a2867",
  storageBucket: "crwn-clothing-db-a2867.appspot.com",
  messagingSenderId: "862121403486",
  appId: "1:862121403486:web:d235174da99f49a28600cf",
  measurementId: "G-24CFC88ZYY",
};

firebase.initializeApp(config);

// Set the auth and firestore
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Get the provider and set the custom parameters.
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

// Let's to sign in with the google.
export const signInWithGoogle = () => auth.signInWithPopup(provider);

// Export whole incase we need it later.
export default firebase;
