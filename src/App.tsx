import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import firebase from 'firebase/compat/app'
import { initializeApp } from 'firebase/app';
import { config } from './config/config';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contacts';
import People from './pages/People';
import Projects from './pages/Projects';
import NoPage from './pages/NoPage';
import Login from './pages/Login';

import Navbar from './components/Navbar';
import AuthRoute from './components/AuthRoute';

import './App.css';

initializeApp(config.firebaseConfig);

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <Navbar />
            <Router>
                <div className="App">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <AuthRoute>
                                    <Home />
                                </AuthRoute>
                            }
                        />
                        <Route
                            path="/home"
                            element={
                                <AuthRoute>
                                    <Home />
                                </AuthRoute>
                            }
                        />
                        <Route path="/login" element={<Login />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contacts" element={<Contact />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/people" element={<People />} />

                        <Route path="*" element={<NoPage />}></Route>
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
}

export default App;
