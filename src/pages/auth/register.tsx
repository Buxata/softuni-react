import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import auth from '../../config/firebase/firebaseAuth';
import AuthContainer from '../../components/AuthContainer';
import { Button, FormGroup, Input } from 'reactstrap';
import ErrorText from '../../components/ErrorText';
import iPageProps from '../../interfaces/page';
import { FirebaseError } from '@firebase/util';
import logging from '../../config/logging';

export interface IRegisterPageProps {}

const RegisterPage: React.FunctionComponent<iPageProps> = (props) => {
    const [registering, setRegistering] = useState(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirm, setConfirm] = useState<string>('');
    const [error, setError] = useState<string>('');

    const navigate = useNavigate();

    const signUpWithEmailAndPassword = () => {
        
        if (password !== confirm)
            setError('Please make sure your passwords martch');
        if (error !== '') setError('');

        setRegistering(true);

        createUserWithEmailAndPassword(auth, email, password)
            .then((result: object) => {
                console.log(JSON.stringify(result));
                navigate('/login');
            })
            .catch((error: FirebaseError) => {
                logging.error(error.message);

                if (error.code.includes('auth/weak-password')) {
                    setError('Please enter a stronger password.');
                } else if (error.code.includes('auth/email-already-in-use')) {
                    setError('Email already in use.');
                } else {
                    setError('Unable to register.  Please try again later.');
                }

                setRegistering(false);
            });
    };

    return (
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
            <FormGroup>
                <Input
                    autoComplete="new-password"
                    type="password"
                    name="confirm"
                    id="confirm"
                    placeholder="Confirm Password"
                    onChange={(event) => setConfirm(event.target.value)}
                    value={confirm}
                />
            </FormGroup>
            <Button
                disabled={registering}
                color="success"
                block
                onClick={() => signUpWithEmailAndPassword()}
            >
                Sign Up
            </Button>
            <small>
                <p className="m-1 text-center">
                    Already have an account? <Link to="/login">Login.</Link>
                </p>
            </small>
            <ErrorText error={error} />
        </AuthContainer>
    );
};

export default RegisterPage;
