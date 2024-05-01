// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupForm from './SignupForm';
import Dashboard from './Dashboard';
import Model from './Model';
import AccountLogin from './components/AccountLogin';


const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/signup" element={<SignupForm/>} />
                    <Route path="/" element={<AccountLogin/>} />
                    <Route path="/dashboard" element={<Dashboard/>} />
                    <Route path="/Model" element={<Model/>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
