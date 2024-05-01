// LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.get('http://localhost:8000/token', {
                params: {
                    username: username,
                    password: password,
                },
            });

            const jwtToken = response.data.access_token;

            localStorage.setItem('token', jwtToken);

            // Redirect to dashboard page after successful login
            navigate('/model');
        } catch (error) {
            console.error('Error logging in:', error);
            setLoginMessage('Invalid username or password');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
            <p>{loginMessage}</p>
        </div>
    );
};

export default LoginForm;
