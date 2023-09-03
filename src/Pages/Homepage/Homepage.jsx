import React, { useState, useEffect } from 'react';
import './Homepage.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../Redux/Features/Auth/authSlice';

const Homepage = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const userData = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (userData === null || userData.isauthenticated === false) {
      nav('/');
    } else {
      nav('/project');
    }
  }, [userData]);

  const [userName, setUserName] = useState('');
  const [userSurname, setUserSurname] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    if (/^[A-Za-zğüşöçıİĞÜŞÖÇ\s]*$/.test(value)) {
      setUserName(value);
    }
    checkFormValidity(value, userSurname);
  };

  const handleSurnameChange = (e) => {
    const value = e.target.value;
    if (/^[A-Za-zğüşöçıİĞÜŞÖÇ\s]*$/.test(value)) {
      setUserSurname(value);
    }
    checkFormValidity(userName, value);
  };

  const checkFormValidity = (name, surname) => {
    setIsFormValid(name.trim() !== '' && surname.trim() !== '');
  };

  const handleLogin = () => {
    if (isFormValid) {
      dispatch(login({ isauthenticated: true, userName, userSurname }));
      nav('/project');
    }
  };

  return (
    <div className='login-container'>
      <div className='login-box'>
        <div className='login-input'>
          <input
            type='text'
            placeholder='Adınız'
            value={userName}
            onChange={handleUsernameChange}
          />
        </div>
        <div className='login-input'>
          <input
            type='text'
            placeholder='Soyadınız'
            value={userSurname}
            onChange={handleSurnameChange}
          />
        </div>
        <div className='login-btn'>
          <button
            id='btn-submit'
            type='button'
            onClick={handleLogin}
            disabled={!isFormValid}
          >
            Giriş
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
