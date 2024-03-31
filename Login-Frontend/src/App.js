// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/signup" element={<SignupForm/>} />
                    <Route path="/" element={<LoginForm/>} />
                    <Route path="/dashboard" element={<Dashboard/>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
