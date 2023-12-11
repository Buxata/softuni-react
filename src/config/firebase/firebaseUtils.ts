// firebaseUtils.ts
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import config from '../config';

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
    firebaseApp,
    signInWithEmailAndPassword,
    signInWithPopup,
};
