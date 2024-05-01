import React from 'react';
import '../styles/logincoverimage.css';
import coverimage from '../assest/coverimage.png';

export default function LoginCoverImage() {
  return (
    <div className='left-side-container'>
      <img src={coverimage} className='cover-image' />
    </div>
  );
}
