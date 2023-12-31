import React from 'react';
import AuthContainer from '../../components/AuthContainer';
import { Button } from 'reactstrap';
import IPageProps from '../../interfaces/page';
import { useNavigate } from 'react-router-dom';
import auth from '../../config/firebase/firebaseAuth';
import logging from '../../config/logging';


const LogOutPage: React.FunctionComponent<IPageProps> = (props) => {
    const navigate = useNavigate();

    const Logout = () => {
        auth.signOut()
            .then(() => navigate('/login'))
            .catch((error) => logging.error(error));
    };

    return (
        <AuthContainer header={props.name}>
            <p className="text-center">Are you sure you want to logout?</p>
            <div className="text-center">
                <Button
                    color="danger"
                    className="mr-2"
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    Cancel
                </Button>
                <Button color="info" className="mr-2" onClick={() => Logout()}>
                    Logout
                </Button>
            </div>
        </AuthContainer>
    );
};

export default LogOutPage;
