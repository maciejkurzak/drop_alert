import React, { useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import './App.css';

import { Routes, Route, Navigate } from 'react-router-dom';
import SideBar from './components/Sidebar/Sidebar';
import AddPost from './components/AddPost';
import Posts from './components/Posts';
import Login from './components/Login';

import useToken from './hooks/useToken';
import Post from './components/Post';

import {
  MantineProvider,
  MantineTheme,
  MantineThemeOverride,
} from '@mantine/core';
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

  const theme: MantineThemeOverride = {
    fontFamily: 'Rubik, sans-serif',
    colorScheme: 'dark',
    spacing: { xs: 10, sm: 15, md: 20, lg: 25, xl: 30 },
    defaultRadius: 'md',
  };

  const { classes }: classesProps = useStyles();

  if (!token) {
    return (
      <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
        <Login setToken={setToken} />
      </MantineProvider>
    );
  }

  return (
    <div className="App">
      <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
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
