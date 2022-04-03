import React, { useState, useEffect } from 'react';
import extractFromHash from './util/extractFromHash';
import './App.css';

const ACCESSTOKEN_LOCALSTORAGE_KEY = 'accessToken';

const createLoginUrl = () => {
  const AUTHORIZE_URI = process.env.REACT_APP_SPOTIFY_AUTHORIZE_URI || '';
  const AUTHORIZE_PARAMETERS: Record<string, string> = {
    response_type: 'token',
    client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID || '',
    redirect_uri: process.env.REACT_APP_SPOTIFY_REDIRECT_URI || 'http://localhost:3000',
  }

  return `${AUTHORIZE_URI}?${new URLSearchParams(AUTHORIZE_PARAMETERS).toString()}`;
}

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // TODO: Refactor
    const accessTokenFromLocalStorage = window.localStorage.getItem(ACCESSTOKEN_LOCALSTORAGE_KEY);
    const hash = window.location.hash;

    if (accessTokenFromLocalStorage) return setIsLoggedIn(true);
    if (hash) {
      window.localStorage.setItem(ACCESSTOKEN_LOCALSTORAGE_KEY, extractFromHash(hash, 'access_token'))
      window.location.hash = '';
      setIsLoggedIn(true);
    }
  }, []);

  if (!isLoggedIn) return (
      <div className='App'>
        <a href={createLoginUrl()}>Login</a>
      </div>
  )

  return (
    <div className='App'>

    </div>
  );
}

export default App;
