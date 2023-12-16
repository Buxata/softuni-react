import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import auth from '../../config/firebase/firebaseAuth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import AuthContainer from '../../components/AuthContainer';
import { Button, FormGroup, Input } from 'reactstrap';
import ErrorText from '../../components/ErrorText';
import iPageProps from '../../interfaces/page';
import logging from '../../config/logging';
import { FirebaseError } from '@firebase/util';
import Auth from 'firebase/auth';
import { SignInWithAuthProvider } from './modules/index';
import Providers from '../../config/firebase/Providers';

const LoginPage: React.FunctionComponent<iPageProps> = (props) => {
    console.log('these are my current props: ' + JSON.stringify(props));

    const navigate = useNavigate();
    const [authing, setAauthing] = useState(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    // const [confirm, setConfirm] = useState<string>('');
    const [error, setError] = useState<string>('');

    const signInWithAuthProvider = async (provider: Auth.AuthProvider) => {
        if (error !== ' ') setError('');
        setAauthing(true);

        SignInWithAuthProvider(provider)
            .then((response) => {
                logging.info(response.toString());
                navigate('/');
            })
            .catch((error: FirebaseError) => {
                logging.info(error.message);
                setAauthing(true);
            });
    };

    const signInWithEmail = () => {
        setAauthing(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((result: object) => {
                logging.info(JSON.stringify(result));
                navigate('/');
            })
            .catch((error: FirebaseError) => {
                logging.error(error.message);
                setAauthing(false);
                if (error.code.includes('auth/invalid-email')) {
                    setError('Invalid email, please try again.');
                } else if (error.code.includes('auth/invalid-credential')) {
                    setError('Wrong credentials, please try again.');
                } else {
                    setError('Could not log you in, please try again later.');
                }
            });
    };

    return (
        <div>
            <AuthContainer header={props.name}>
                <FormGroup>
                    <Input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email Address"
                        onChange={(event) => setEmail(event.target.value)}
                        value={email}
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        autoComplete="new-password"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter Password"
                        onChange={(event) => setPassword(event.target.value)}
                        value={password}
                    />
                </FormGroup>
                <Button
                    disabled={authing}
                    color="success"
                    block
                    onClick={() => signInWithEmail()}
                    type="submit"
                >
                    Sign In
                </Button>
                <hr className="bg-info m-3"></hr>
                <Button
                    disabled={authing}
                    color="warning"
                    block
                    onClick={() => signInWithAuthProvider(Providers.google)}
                    style={{
                        backgroundColor: '#1DA1F2',
                        borderColor: '#1DA1F2',
                    }}
                >
                    Sign In With Google
                </Button>
                <small>
                    <p className="m-1 text-center">
                        Don't have an account?
                        <Link to="/register">Register here.</Link>
                    </p>
                    <p className="m-1 text-center">
                        Forgot your password?
                        <Link to="/forgotten">Reset here</Link>
                    </p>
                </small>
                <ErrorText error={error} />
            </AuthContainer>
        </div>
    );
};

export default LoginPage;
