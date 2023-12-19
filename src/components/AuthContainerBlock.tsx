import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, Unsubscribe } from 'firebase/auth';
import auth from '../config/firebase/firebaseAuth';

export interface IAuthRouteProps {
    children: React.ReactNode;
}

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = (props) => {
    const { children } = props;
    const [loading, setLoading] = useState(true); // Set loading to true initially
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const unsubscribe: Unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('Inside of onAuthStateChanged: ' + user.email);
                setAuthorized(true);
            } else {
                console.log('Inside of onAuthStateChanged');
                setAuthorized(false);
            }

            setLoading(false); // Move setLoading inside the callback
        });

        // Cleanup function to unsubscribe when the component unmounts
        return () => {
            unsubscribe();
        };
    }, []); // Empty dependency array ensures that the effect runs only once

    //console.log('Is this constantly re-rendering?');

    if (loading) return <p>Loading....</p>;
    else if (!authorized) return <p>Register/Login for more options</p>;
    else return <>{children}</>;
};

export default AuthRoute;
