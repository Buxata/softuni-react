import React from 'react';
import { getAuth, signOut } from 'firebase/auth';

import './Navbar.css';

export interface INavBarProps {}

const Navbar: React.FunctionComponent<INavBarProps> = (props) => {
    console.log('these are my current props: ' + JSON.stringify(props));

    const auth = getAuth();
    return (
        <ul className="navigation">
            <li>
                <a href="/">Home</a>
            </li>
            <li>
                <a href="/about">About</a>
            </li>
            <li>
                <a href="/contacts">Contacts</a>
            </li>
            <li>
                <a href="/projects">Projects</a>
            </li>
            <li>
                <a href="/people">People</a>
            </li>
            <li>
                <a href="/home">User</a>
            </li>
            <li >
                <button onClick={() => signOut(auth) }>Sign Out</button>
            </li>
        </ul>
    );
};

export default Navbar;
