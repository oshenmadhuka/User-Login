import React from 'react';
import '../styles/usertypes.css';
import HRImage from '../assest/HR.png'; 
import EMImage from '../assest/EM.png'; 
import MNImage from '../assest/MN.png'

export default function UserTypes({  userType }) {
  let src;

  switch (userType) {
    case 'HR':
      src = HRImage;
      break;
    case 'Employee':
      src = EMImage;
      break;
    case 'Manager':
      src = MNImage;
      break;
    default:
      src = '';
  }

  return (
    <div className='user-types'>
      <div className='user-panel'>
        <img src={src} alt={`Cover for ${userType}`} className='single-user'/>
        <p className='user-para'>{userType}</p>
      </div>
    </div>
  );
}
