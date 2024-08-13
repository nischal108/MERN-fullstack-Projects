import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);

  const handleSignOut =()=>{
    localStorage.clear();
    navigate('/login')
  }

  return (
    <div className='flex items-center justify-between px-5 py-2 bg-slate-200 m-2 rounded-3xl w-5/12 mx-auto'>
      <div className='font-bold cursor-pointer'>
        <Link to={'/'}><h3>DIGITAL <br /> WALLET</h3></Link>
      </div>
      <div 
        className='relative h-10 w-10 cursor-pointer'
        onMouseEnter={() => setDropdown(true)}
        onMouseLeave={() => setDropdown(false)}
      >
        <img src="https://cdn1.iconfinder.com/data/icons/website-internet/48/website_-_male_user-512.png" alt="User" />
        <div className={`${dropdown ? 'flex' : 'hidden'} absolute top-full bg-white p-2 rounded-lg shadow-lg w-44`}>
          <ol className='flex flex-col items-start w-full'>
            <li className='cursor-pointer hover:bg-gray-200 px-2 py-1 w-full rounded'>Update Profile Info</li>
            <li className='cursor-pointer hover:bg-gray-200 px-2 py-1 w-full rounded' onClick={handleSignOut}>Signout</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Header;
