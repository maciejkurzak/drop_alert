import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
  const [username, setUserName]: any[] = useState();
  const [password, setPassword]: any[] = useState();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
    token ? console.log(token) : console.log('error');
    setToken(token);
  };

  return (
    <StyledLogin className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
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
