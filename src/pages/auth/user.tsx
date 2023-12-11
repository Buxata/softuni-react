import React from 'react';
import IPageProps from '../../interfaces/page';
import { auth } from '../../config/firebase';
import { User } from 'firebase/auth';
import { Link } from 'react-router-dom';

function isUser(variable: any): variable is User {
    return variable && typeof variable === 'object' && 'uid' in variable;
}

const UserPage: React.FunctionComponent<IPageProps> = (props) => {
    const user = auth.currentUser;
    if (isUser(user))
        return (
            <div>
                <h1>{props.name} page</h1>
                <p>Hello there, this is your email right?</p>
                <p>{user?.email}</p>
                <p>
                    If that is the case then you can change your password here:
                </p>
                <p>
                    This page will redirect you to home, if you have used
                    provider, rather than a local account.
                </p>
                <Link to={'/change'}>Change Password</Link>
            </div>
        );
    else
        return (
            <div>
                <p>
                    This does not loog good. Seems like this is not a legit
                    user.
                </p>
            </div>
        );
};

export default UserPage;
