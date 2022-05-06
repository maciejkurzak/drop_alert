import React, { useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import './App.css';

import { Routes, Route, Navigate } from 'react-router-dom';
import SideBar from './components/Sidebar.styled';
import AddPost from './components/AddPost.styled';
import Posts from './components/Posts.styled';
import Login from './components/Login.styled';

import useToken from './hooks/useToken';
import Post from './components/Post.styled';

const RouterView = styled.div`
  width: 100%;
  min-height: 100%;
  margin: 2rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
`;

const App = () => {
  // const { token, setToken } = useToken();
  // console.log(token);

  // if (!token) {
  //   return <Login setToken={setToken} />;
  // }

  return (
    <div className="App">
      <SideBar />
      <RouterView>
        <Routes>
          <Route path="/" element={<Navigate replace to="/posts" />}></Route>
          <Route path="/posts/:postId" element={<Post abc={'123'} />} />
          <Route path="/posts" element={<Posts />}></Route>
          <Route path="add-post" element={<AddPost />} />
        </Routes>
      </RouterView>
    </div>
  );
};

export default App;
