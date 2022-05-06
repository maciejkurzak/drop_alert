import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useStore } from '../store/userData';

const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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
  }).then((data) => data.json());
};

const Login: React.FC<LoginProps> = ({ setToken }) => {
  const [username, setUsername]: any[] = useState();
  const [password, setPassword]: any[] = useState();

  const updateLoggedUser = useStore((store) => store.updateLoggedUser);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const loginResponse = await loginUser({
      username,
      password,
    });

    console.log(loginResponse);

    updateLoggedUser({ loginResponse });

    // window.location.reload();
  };

  return (
    <StyledLogin className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </StyledLogin>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
