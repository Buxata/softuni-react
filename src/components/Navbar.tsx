import React, { useEffect, useState } from 'react';

import './Navbar.css';
import { Link } from 'react-router-dom';
import routes from '../config/routes';
import auth from '../config/firebase/firebaseAuth';
import { User, onAuthStateChanged } from 'firebase/auth';
import IRoute from '../interfaces/route';

export interface INavBarProps {
    name: string;
}

const Navbar: React.FunctionComponent<INavBarProps> = (props) => {
    console.log(props.name);
    const [navRoutes, setNavRoutes] = useState<IRoute[]>();
    useEffect(() => {
        const updateNavRoutes = (user: User | null) => {
            if (user) {
                setNavRoutes(
                    routes.filter((route) => route.navbar_authed === true)
                );
            } else {
                setNavRoutes(routes.filter((route) => route.navbar === true));
            }
        };

        const unsubscribe = onAuthStateChanged(auth, updateNavRoutes);

        // Cleanup function to unsubscribe when the component is unmounted
        return () => unsubscribe();
    }, []); // Empty dependency array means this effect runs once after the initial render

    return (
        <ul className="navigation">
            {navRoutes &&
                navRoutes.map((route: IRoute, index: number) => {
                    return (
                        <li key={index}>
                            <Link to={route.path}>{route.name}</Link>
                        </li>
                    );
                })}
            {/* <li>
                <Button onClick={() => navigate('/logout')}>Sign Out</Button>
            </li> */}
        </ul>
    );
};

export default Navbar;
