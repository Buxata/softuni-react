import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Button, Spinner } from 'reactstrap';

import firebaseApp from './config/firebase/firebaseApp';
import auth from './config/firebase/firebaseAuth';

import NoPage from './pages/NoPage';
import routes from './config/routes';
import logging from './config/logging';
import Navbar from './components/Navbar';
import AuthRoute from './components/AuthRoute';

import ProjectDetailPage from './pages/Project';
import ProjectEditPage from './pages/ProjectEdit';

import './App.css';
import IRoute from './interfaces/route';
import React from 'react';

const FirebaseInstance = firebaseApp;

export interface IApp {
    name: string;
}

const App: React.FunctionComponent<IApp> = (props) => {
    if (FirebaseInstance) {
        console.log(
            'Firebase Instance is detected name:' + FirebaseInstance.name
        );
    }

    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                logging.info('User detected.');
            } else {
                logging.info('No user detected');
            }

            setLoading(false);
        });
    }, []);

    if (loading) return <Spinner color="info" />;
    // initializeApp(config.firebaseConfig);
    return (
        <>
            <Router>
                <Navbar name={props.name} />
                <div className="application-container">
                    <Routes>
                        {routes.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                element={<RouteHandler route={route} />}
                            />
                        ))}
                        <Route
                            path="*"
                            element={
                                <NoPage name="Page Not Found - the dreaded 404" />
                            }
                        />
                        <Route
                            path="/project/:id"
                            element={<ProjectDetailPage id="" />}
                        />
                        <Route
                            path="/projectEdit/:id"
                            element={<ProjectEditPage id="" />}
                        />
                    </Routes>
                </div>
            </Router>
            <div className="card">
                <Button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </Button>
            </div>
        </>
    );
};

const RouteHandler: React.FunctionComponent<{ route: IRoute }> = ({
    route,
}) => {
    if (route.protected) {
        return (
            <AuthRoute>
                <route.component
                    component={route.component}
                    name={route.name}
                    path={route.path}
                    exact={route.exact}
                    protected={route.protected}
                    navbar={route.navbar}
                    navbar_authed={route.navbar_authed}
                />
            </AuthRoute>
        );
    }

    return (
        <route.component
            component={route.component}
            name={route.name}
            path={route.path}
            exact={route.exact}
            protected={route.protected}
            navbar={route.navbar}
            navbar_authed={route.navbar_authed}
        />
    );
};

export default App;
