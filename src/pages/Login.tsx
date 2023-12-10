import React from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export interface IloginPageProprs {}

const LoginPage: React.FunctionComponent<IloginPageProprs> = (props) => {
    console.log('these are my current props: ' + JSON.stringify(props));

    const auth = getAuth();
    const navigate = useNavigate();
    const [authing, setAauthing] = useState(false);

    const signInWithGoogle = async () => {
        setAauthing(true);

        signInWithPopup(auth, new GoogleAuthProvider())
            .then((response) => {
                console.log('User: ' + response.user.uid);
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
                setAauthing(true);
            });
    };

    return (
        <div>
            <p>This is a login page.</p>
            <button onClick={() => signInWithGoogle()} disabled={authing}>
                Sign in with Google
            </button>
        </div>
    );
};

export default LoginPage;
