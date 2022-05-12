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

import { MantineProvider, MantineTheme } from '@mantine/core';
import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme, _params, getRef) => ({
  routerView: {
    width: '100%',
    minHeight: '100%',
    margin: '2rem',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '0.5rem',
    fontFamily: 'Rubik, sans-serif',
  },
}));

const App = () => {
  const { token, setToken } = useToken();

  interface classesProps {
    classes: Record<'routerView', string>;
    cx: (...args: any) => string;
    theme: MantineTheme;
  }

  const { classes }: classesProps = useStyles();

  if (!token) {
    return (
      <MantineProvider
        theme={{ fontFamily: 'Rubik, sans-serif', colorScheme: 'dark' }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Login setToken={setToken} />
      </MantineProvider>
    );
  }

  return (
    <div className="App">
      <MantineProvider
        theme={{ fontFamily: 'Rubik, sans-serif', colorScheme: 'dark' }}
        withGlobalStyles
        withNormalizeCSS
      >
        <SideBar />
        <div className={classes.routerView}>
          <Routes>
            <Route path="/" element={<Navigate replace to="/posts" />}></Route>
            <Route path="/posts/:postId" element={<Post abc={'123'} />} />
            <Route path="/posts" element={<Posts />}></Route>
            <Route path="add-post" element={<AddPost />} />
          </Routes>
        </div>
      </MantineProvider>
    </div>
  );
};

export default App;
