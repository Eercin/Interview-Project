import React, { useEffect } from 'react';
import './Project.css';
import { useDispatch, useSelector } from 'react-redux';
import { saveData, getData } from '../../Redux/Features/Data/dataSlice';
import { logout } from '../../Redux/Features/Auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Project = () => {
  const userData = useSelector((state) => state.auth.user);
  const nav = useNavigate();

  useEffect(() => {
    if (userData === null || userData.isauthenticated === false) {
      nav('/');
    }
  }, [userData]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getData());
  }, []);

  const myData = useSelector((state) => state.data);

  const calculateOkunus = (payda) => {
    if (payda === 10) {
      return 'onda';
    } else if (payda === 100) {
      return 'yüzde';
    } else if (payda === 1000) {
      return 'binde';
    } else {
      return '';
    }
  };

  const payOkunus = (pay) => {
    const sayilar = [
      'bir',
      'iki',
      'üç',
      'dört',
      'beş',
      'altı',
      'yedi',
      'sekiz',
      'dokuz',
      'on',
    ];
    
    if (pay >= 1 && pay <= 10) {
      return sayilar[pay - 1];
    }

  };


  const okunusTam =
    myData.pay === myData.payda ? (
      <div>Bir</div>
    ) : (
      <div>
        {calculateOkunus(myData.payda)} {payOkunus(myData.pay)}
      </div>
    );

  const incrementOne = () => {
    if (myData.pay < 10) {
      dispatch(saveData({ pay: myData.pay + 1, payda: myData.payda }));
    }
  };

  const decrementOne = () => {
    if (myData.pay > 1) {
      dispatch(saveData({ pay: myData.pay - 1, payda: myData.payda }));
    }
  };

  const incrementX = () => {
    if (myData.payda < 1000) {
      dispatch(saveData({ pay: myData.pay, payda: myData.payda * 10 }));
    }
  };

  const decrementX = () => {
    if (myData.payda > 10) {
      dispatch(saveData({ pay: myData.pay, payda: myData.payda / 10 }));
    }
  };

  const handleLogOut = () => {
    dispatch(logout({ isauthenticated: false }));
  };

  return (
    <div className='my-app-main'>
      <div className='my-app-container'>
        <div className='my-app-header'>
          <div className='my-app-header-user-name'>
            <span>{`Hoşgeldin ${userData.userName} ${userData.userSurname}`}</span>
          </div>
          <div className='my-app-header-content-info'>
            <h1>
              Paydası 10, 100 ve 1000 şeklinde artan kesirin payını artırarak
              okunuşunu ve şekildeki gösterimi inceleyebilirsiniz.
            </h1>
          </div>
        </div>
        <div className='my-app-content'>
          <div className='my-app-content-left'>
            <div className='my-app-content-left-top'>
              <span>Kesir</span>
              <span className='line'>{myData.pay}</span>
              <span></span>
              <span>{myData.payda}</span>
            </div>
            <div className='my-app-content-left-bottom'>
              <span>{okunusTam}</span>
            </div>
          </div>
          <div className='my-app-content-mid'>
            <div className='my-app-content-mid-top'>
              <div className='btn-decrease'>
                <button
                  className='d-i-btn'
                  onClick={decrementOne}
                  style={{
                    background: myData.pay === 1 ? '#eeeeee' : '#ffffff',
                  }}
                >
                  -
                </button>
              </div>
              <div className='my-app-content-mid-value'>{myData.pay}</div>
              <div className='btn-increase'>
                <button
                  className='d-i-btn'
                  onClick={incrementOne}
                  style={{
                    background: myData.pay === 10 ? '#eeeeee' : '#ffffff',
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <div className='line-two'></div>
            <div className='my-app-content-mid-bottom'>
              <div className='btn-decrease'>
                <button
                  className='d-i-btn'
                  onClick={decrementX}
                  style={{
                    background: myData.payda === 10 ? '#eeeeee' : '#ffffff',
                  }}
                >
                  -
                </button>
              </div>
              <div className='my-app-content-mid-value'>{myData.payda}</div>
              <div className='btn-increase'>
                <button
                  className='d-i-btn'
                  onClick={incrementX}
                  style={{
                    background: myData.payda === 1000 ? '#eeeeee' : '#ffffff',
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className='my-app-content-left'>
            <div className='my-app-content-right-top'>
              <span>Ondalık Gösterim</span>
              <span>{`${myData.pay / myData.payda}`}</span>
            </div>
            <div className='my-app-content-right-bottom'>
              {myData.pay === myData.payda ? (
                <span>Bir</span>
              ) : (
                <div>
                  <span>Sıfır tam</span> {okunusTam}
                </div>
              )}
            </div>
            <div className='btn-logout'>
              <button onClick={handleLogOut}>Çıkış Yap</button>
            </div>
          </div>
        </div>
        <div className='app-rest-container'>
          <div className='my-app-rest'>
            {Array.from({ length: myData.payda }, (_, index) => (
              <div
                className={`box ${index < myData.pay && 'black'} `}
                key={index}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
