import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    if (!tokenString) return null;
    const userToken = JSON.parse(tokenString as any);
    return userToken.token;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (loginResponse: any) => {
    console.log(loginResponse);
    localStorage.setItem('token', JSON.stringify(loginResponse.token));
    setToken(loginResponse.token);
  };

  return {
    setToken: saveToken,
    token,
  };
}
