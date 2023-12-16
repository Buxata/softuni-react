import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from '@firebase/auth';
import auth from '../../config/firebase/firebaseAuth';
import AuthContainer from '../../components/AuthContainer';
import { Button, FormGroup, Input } from 'reactstrap';
import ErrorText from '../../components/ErrorText';
import iPageProps from '../../interfaces/page';
import logging from '../../config/logging';

const ForgottenPage: React.FunctionComponent<iPageProps> = (props) => {
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string>('');

    const resetPasswordRequest = () => {
        if (error != '') setError(error);

        setSending(true);

        sendPasswordResetEmail(auth, email)
            .then(() => {
                logging.info('Email sent');
                setSent(true);
                setSending(false);
            })
            .catch((error) => {
                logging.error(error);
                setError(error.message);
                setSending(false);
            });
    };

    return (
        <AuthContainer header={props.name}>
            {sent ? (
                <>
                    <p>A Link has been sent to your email with instructions</p>
                    <p>
                        Back to the <Link to="/login">login page.</Link>
                    </p>
                </>
            ) : (
                <>
                    <p></p>
                    <FormGroup>
                        <p>Please eneter your email</p>
                        <Input
                            autoComplete="email"
                            type="email"
                            id="email"
                            placeholder="Email Adress"
                            onChange={(event) => setEmail(event.target.value)}
                            value={email}
                        ></Input>
                    </FormGroup>
                    <Button
                        disabled={sending}
                        color="success"
                        block
                        onClick={() => resetPasswordRequest()}
                    >
                        Send Reset Password Email
                    </Button>
                    <ErrorText error={error} />
                </>
            )}
        </AuthContainer>
    );
};

export default ForgottenPage;
