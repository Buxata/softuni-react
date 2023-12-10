import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export interface IAuthRouteProps {
    children: React.ReactNode;
}

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = (props) => {
    const { children } = props;
    const auth = getAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const authCheck = async () => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setLoading(false);
                } else {
                    console.log('It does not seem like you are authorized');
                    navigate('/register');
                }
            });
        };

        authCheck();
    }, [auth, navigate]);

    if (loading) {
        return <p>Loading....</p>;
    }

    return <>{children}</>;
};

export default AuthRoute;
