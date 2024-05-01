// SignupForm.js
import React from 'react'
import '../src/styles/accountlogin.css'
import UserTypes from './components/UserTypes';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import coverimage from "./assest/coverimage.png"


const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [signupMessage, setSignupMessage] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            const response = await axios.post('http://localhost:8000/signup', { username, password });
            setSignupMessage(response.data.message);
            navigate('/')
        } catch (error) {
            console.error('Error signing up:', error);
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
                <h1 className='header-H1'>SignUp</h1>
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
                    onChange={(e) => setUsername(e.target.value)}
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
                <p>{signupMessage}</p>   
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
                <button className='login-box' onClick={handleSignup}>
                    Sign Up
                </button>
            </div>
            
        </div>
      </div>
    </div>
    );
};

export default SignupForm;
