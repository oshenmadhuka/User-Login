// SignupForm.js
import React, { useState } from 'react';
import axios from 'axios';

const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [signupMessage, setSignupMessage] = useState('');

    const handleSignup = async () => {
        try {
            const response = await axios.post('http://localhost:8000/signup', { username, password });
            setSignupMessage(response.data.message);
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSignup}>Sign Up</button>
            <p>{signupMessage}</p>
        </div>
    );
};

export default SignupForm;
