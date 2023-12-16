import Auth from 'firebase/auth';
import { auth, signInWithPopup } from '../../../config/firebase/firebaseUtils';

export const SignInWithAuthProvider = (provider: Auth.AuthProvider) =>
    new Promise<Auth.UserCredential>((resolve,reject) => {
        signInWithPopup(auth,provider)
        .then(result => resolve(result))
        .catch(error => reject(error));
    });

