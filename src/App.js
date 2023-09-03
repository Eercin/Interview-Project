import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './Pages/Homepage/Homepage';
import Project from './Pages/Project/Project';
import { useDispatch } from 'react-redux';
import { getUserData } from './Redux/Features/Auth/authSlice';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserData());
  }, []);
  return (
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/project' element={<Project />} />
    </Routes>
  );
}

export default App;
