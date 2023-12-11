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

const LoginPage: React.FunctionComponent<iPageProps> = (props) => {
    console.log('these are my current props: ' + JSON.stringify(props));

    const navigate = useNavigate();
    const [authing, setAauthing] = useState(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    // const [confirm, setConfirm] = useState<string>('');
    const [error, setError] = useState<string>('');

    const signInWithGoogle = async () => {
        // setAauthing(true);

        // signInWithPopup(auth, Providers.google))
        //     .then((response) => {
        //         console.log('User: ' + response.user.uid);
        //         navigate('/');
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //         setAauthing(true);
        //     });
        alert('not working yet.');
    };

    const signInWithEmail = () => {
        setAauthing(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((result: object) => {
                console.log(JSON.stringify(result));
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
                    onClick={()=> signInWithEmail()}
                    type='submit'
                >
                    Sign In
                </Button>
                <Button
                    disabled={authing}
                    color="warning"
                    block
                    onClick={signInWithGoogle}
                >
                    Sign In With Google
                </Button>
                <small>
                    <p className="m-1 text-center">
                        Don't have an account?{' '}
                        <Link to="/register">Register here.</Link>
                    </p>
                </small>
                <ErrorText error={error} />
            </AuthContainer>
        </div>
    );
};

export default LoginPage;
