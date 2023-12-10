import { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from 'react-router-dom';
import { Spinner } from 'reactstrap';

import firebaseApp from './config/firebase';
import { auth } from './config/firebase';

// import Home from './pages/Home';
// import About from './pages/About';
// import Contact from './pages/Contacts';
// import People from './pages/People';
// import Projects from './pages/Projects';
// import NoPage from './pages/NoPage';
// import Login from './pages/auth/Login';
import routes from './config/routes';
import logging from './config/logging';

import Navbar from './components/Navbar';
import AuthRoute from './components/AuthRoute';

import './App.css';

export interface IApp {}

const FirebaseInstance = firebaseApp;

const App: React.FunctionComponent<IApp> = (props) => {
    console.log(
        'these are my current props: ' +
            JSON.stringify(props) +
            '\nFirebase instance' +
            JSON.stringify(FirebaseInstance)
    );
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
            <Navbar />
                <Router>
                    <div>
                        <Routes>
                            {routes.map((route, index) => (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={<RouteHandler route={route} />}
                                />
                            ))}
                        </Routes>
                    </div>
                </Router>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
            </div>
        </>
    );
};

const RouteHandler: React.FunctionComponent<{ route: any }> = ({ route }) => {
    const location = useLocation();

    if (route.protected) {
        return (
            <AuthRoute>
                <route.component location={location} />
            </AuthRoute>
        );
    }

    return <route.component location={location} />;
};

export default App;
