import React, { useEffect, useState } from 'react';
import { Button, FormGroup, Input, Spinner } from 'reactstrap';
import AuthContainer from '../../components/AuthContainerForm';
import ErrorText from '../../components/ErrorText';
import auth from '../../config/firebase/firebaseAuth';
import logging from '../../config/logging';
import IPageProps from '../../interfaces/page';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'querystring';

const ChangePasswordPage: React.FunctionComponent<IPageProps> = (props) => {
    const [verifying, setVerifying] = useState<boolean>(false);
    const [verified, setVerified] = useState<boolean>(false);
    const [changing, setChanging] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [confirm, setConfirm] = useState<string>('');
    const [oobCode, setOobCode] = useState<string>('');
    const [error, setError] = useState<string>('');

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const { search } = location;
        logging.info('Extracting code');

        const stringParams = queryString.parse(search);
        if (stringParams) {
            const oobCode = stringParams.oobCode as string;

            if (oobCode) {
                logging.info('Code found');
                verifyPasswordResetLink(oobCode);
            } else {
                logging.error('Unable to find code');
                setVerified(false);
                setVerifying(false);
            }
        } else {
            logging.error('Unable to find code');
            setVerified(false);
            setVerifying(false);
        }
    }, [location]);

    const verifyPasswordResetLink = (_oobCode: string) => {
        verifyPasswordResetCode(auth, _oobCode)
            .then((result) => {
                logging.info(result);
                setOobCode(_oobCode);
                setVerified(true);
                setVerifying(false);
            })
            .catch((error) => {
                logging.info(error);
                setOobCode(_oobCode);
                setVerified(false);
                setVerifying(false);
            });
    };

    const passwordResetRequest = () => {
        if (password !== confirm) {
            setError('Make sure your passwords are matching');
            return;
        }

        if (error !== '') setError('');

        setChanging(true);

        confirmPasswordReset(auth, oobCode, password)
            .then(() => {
                logging.info('Password change successful.');
                navigate('/login');
            })
            .catch((error) => {
                logging.error(error);
                setChanging(false);
                setError(error.message);
            });
    };

    return (
        <AuthContainer header={props.name}>
            {verifying ? (
                <Spinner />
            ) : (
                <>
                    {verified ? (
                        <>
                            <p>Please enter a strong password</p>
                            <FormGroup>
                                <Input
                                    autoComplete="new-password"
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Enter Password"
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
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
                                    onChange={(event) =>
                                        setConfirm(event.target.value)
                                    }
                                    value={confirm}
                                />
                            </FormGroup>
                            <Button
                                disabled={changing}
                                color="success"
                                block
                                onClick={() => passwordResetRequest()}
                            >
                                Change Password
                            </Button>
                            <ErrorText error={error} />
                        </>
                    ) : (
                        <p>Invalid Password Reset Link</p>
                    )}
                </>
            )}
        </AuthContainer>
    );
};

export default ChangePasswordPage;
