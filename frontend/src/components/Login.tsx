import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useStore } from '../store/userData';

import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
} from '@mantine/core';

interface LoginProps {
  setToken: any;
}

const loginUser = async (credentials: any) => {
  return fetch('http://localhost:5100/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  }).then((res: any) => {
    if (!res.ok) console.log(res.status + ' ' + res.statusText);
    else return res.json();
  });
};

const Login: React.FC<LoginProps> = ({ setToken }) => {
  const [username, setUsername]: any[] = useState();
  const [password, setPassword]: any[] = useState();

  const updateLoggedUser = useStore((store) => store.updateLoggedUser);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (username && password) {
      const loginResponse = await loginUser({
        username,
        password,
      });
      if (loginResponse) {
        updateLoggedUser(loginResponse);
      }
    } else {
      console.log('Please fill in all fields');
    }

    window.location.reload();
  };

  const useStyles = createStyles((theme) => ({
    wrapper: {
      minHeight: 900,
      height: '100vh',
      backgroundSize: 'cover',
      backgroundImage: 'url(https://i.imgur.com/Yo1cHVG.jpg)',
    },

    form: {
      borderRight: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[7]
          : theme.colors.gray[3]
      }`,
      minHeight: 900,
      maxWidth: 450,
      paddingTop: 80,
      height: '100%',

      [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
        maxWidth: '100%',
      },
    },

    title: {
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      fontFamily: `${theme.fontFamily}`,
    },

    logo: {
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      width: 120,
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }));

  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title
          order={2}
          className={classes.title}
          align="center"
          mt="md"
          mb={50}
        >
          dropee.pl
        </Title>
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Username"
            placeholder="Your username"
            size="md"
            onChange={(e) => setUsername(e.target.value)}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <Checkbox label="Keep me logged in" mt="xl" size="md" /> */}
          <Button fullWidth mt="xl" size="md" type="submit">
            Login
          </Button>
        </form>
      </Paper>
    </div>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
