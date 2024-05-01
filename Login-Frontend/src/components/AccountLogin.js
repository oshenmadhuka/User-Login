import React from 'react'
import '../styles/accountlogin.css';
import UserTypes from './UserTypes';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import coverimage from '../assest/coverimage.png'

export default function AccountLogin() {

    const [username, setusername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
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

    <div className='maincon'>
        <div className='left-side-container'>
          <img src={coverimage} className='cover-image' />
        </div>
        <div className='right-container'>
        <div className='container1'>
            <div className='header'>
                <h1 className='header-H1'>Account Login</h1>
                <p className='header-paragraph'>If you are already a member you can login with your email address and password</p>
            </div>

            <div className='w-full flex flex-col'>
                <p className='paragraph'>User types</p>
                <div className='user'>
                    <UserTypes  className="your-image-class" userType="HR" />
                    <UserTypes  className="your-image-class" userType="Manager" />
                    <UserTypes  className="your-image-class" userType="Employee" />
                </div>
                
            </div>

            <div className='w-full flex flex-col'>
                <p className='paragraph'>User name</p>
                <input
                    type='email'
                    placeholder='User name'
                    className='box'
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                />
            </div>
            <div className='w-full flex flex-col'>
                <p className='paragraph'>Password</p>
                <input
                    type='password'
                    placeholder='Password'
                    className='box'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <p>{loginMessage}</p>   
            </div>

            <div className='w-full flex items-center justify-between'>
                <div className='checkbox-raw'>
                    <input
                    type='checkbox'
                    id='myCheckbox'
                    className='custom-checkbox'
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    />
                    <label htmlFor='myCheckbox' className='custom-label'></label>

                    <p className='paragraph'>Remember me</p>
                </div>
                 
            </div>

            <div className='w-full flex flex-col my-4'>
                <button className='login-box' onClick={handleLogin}>
                    Log in
                </button>
            </div>

            {/* <div className='sign'>
                <p className='sign-up'>
                    Don't Have a account? <span className='sign-up-here'>Sign up here</span>
                </p>
            </div>         */}
            
        </div>
      </div>
    </div>
    
  )
}
