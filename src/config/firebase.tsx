import { initializeApp } from 'firebase/app';
import {
    getAuth,
    GoogleAuthProvider,
    createUserWithEmailAndPassword, //,
    signInWithEmailAndPassword,
    signInWithPopup,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import config from '../config/config';

const firebaseApp = initializeApp(config.firebaseConfig);

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const Providers = {
    google: new GoogleAuthProvider(),
};

export {
    auth,
    firestore,
    Providers,
    createUserWithEmailAndPassword,
    firebaseApp, // Export the initialized app instance
    signInWithEmailAndPassword,
    signInWithPopup
};

export default firebaseApp;
