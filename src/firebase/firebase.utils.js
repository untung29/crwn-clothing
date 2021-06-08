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

// Store the authenticated user to the firestore
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) {
    return;
  }

  // Only get the document reference
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  // Do the one of the CRUD operations from the userRef, in this case is Get METHOD
  const snapshot = await userRef.get();

  // Check whether the user exists or no in the authentication database
  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName: displayName,
        email: email,
        createdAt: createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  /* QueryReference and QuerySnapshot
   QueryReference -> current place in the database that we are querying.
   It does not have the actual data, it only returns the path and id.
   
   documentRef -> CRUD (.set, get, update, delete), returns documentSnapshot
  collectionRef -> .add, returns querySnapshot
   */

  return userRef;
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
