// firebaseUtils.ts
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import config from '../config';

const developer = false;

const firebaseApp = initializeApp(config.firebaseConfig);

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
if(developer ){
    connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
}

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
