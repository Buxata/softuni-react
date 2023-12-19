import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import auth from '../config/firebase/firebaseAuth';
import { useNavigate } from 'react-router-dom';
import logging from '../config/logging';

export interface IAuthRouteProps {
    children: React.ReactNode;
}

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = (props) => {
    const { children } = props;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const authCheck = async () => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setLoading(false);
                } else {
                    logging.warn('It does not seem like you are authorized');
                    navigate('/home');
                }
            });
        };

        authCheck();
    }, [navigate]);

    if (loading) {
        return <p>Loading....</p>;
    }

    return <>{children}</>;
};

export default AuthRoute;
