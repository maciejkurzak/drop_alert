import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('loggedUser');
    if (!tokenString) return null;
    const userToken = JSON.parse(tokenString).token;
    return userToken;
  };
  const [token, setToken] = useState(getToken());

  const saveToken = (loginResponse: any) => {
    const newValue = JSON.parse(localStorage.getItem('loggedUser') as string);
    newValue.token = loginResponse.token;
    localStorage.setItem('loggedUser', JSON.stringify(newValue));
    setToken(loginResponse.token);
  };

  return {
    setToken: saveToken,
    token,
  };
}
