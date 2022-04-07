import React, { useState } from 'react';

import './App.css';

import { Routes, Route, Link } from 'react-router-dom';
import SideBar from './components/Sidebar.styled';
import AddPost from './components/AddPost.styled';
import Posts from './components/Posts.styled';
import Login from './components/Login.styled';

import useToken from './hooks/useToken';

const App = () => {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="App">
      <SideBar />
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="add-post" element={<AddPost />} />
      </Routes>
    </div>
  );
};

export default App;
