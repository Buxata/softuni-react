import React, { useState } from 'react';
import { Button, FormGroup, Input } from 'reactstrap';
import AuthContainer from '../../components/AuthContainer';
import ErrorText from '../../components/ErrorText';
import auth from '../../config/firebase/firebaseAuth';
import logging from '../../config/logging';
import IPageProps from '../../interfaces/page';
import { User, updatePassword } from 'firebase/auth';
import { Navigate, useNavigate } from 'react-router-dom';

const ChangePasswordPage: React.FunctionComponent<IPageProps> = (props) => {
    const [changing, setChanging] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [old, setOld] = useState<string>('');
    const [confirm, setConfirm] = useState<string>('');
    const [error, setError] = useState<string>('');

    const navigate = useNavigate();

    function isUser(variable: object | null): variable is User {
        return variable !== null && typeof variable === 'object' && 'uid' in variable;
    }

    const passwordChangeRequest = () => {
        if (password !== confirm) {
            setError('Make sure your passwords are matching');
            return;
        }

        if (error !== '') setError('');

        setChanging(true);

        const user = auth.currentUser;
        if (isUser(user)) {
            updatePassword(user, password)
                .then(() => {
                    logging.info('Password change successful.');
                    navigate('/');
                })
                .catch((error) => {
                    logging.error(error);
                    setChanging(false);
                    setError(error.message);
                });
        }
    };

    if (auth.currentUser?.providerData[0]?.providerId !== 'password')
        return <Navigate to="/" />;

    return (
        <AuthContainer header={props.name}>
            <FormGroup>
                <Input
                    autoComplete="new-password"
                    type="password"
                    name="oldPassword"
                    id="oldPassword"
                    placeholder="Current Password"
                    onChange={(event) => setOld(event.target.value)}
                    value={old}
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
                disabled={changing}
                color="success"
                block
                onClick={() => passwordChangeRequest()}
            >
                Change Password
            </Button>
            <ErrorText error={error} />
        </AuthContainer>
    );
};

export default ChangePasswordPage;
