import React, { useState, useEffect } from 'react';
import createLoginUrl from './util/createLoginUrl';
import extractFromHash from '../../util/extractFromHash';

const ACCESSTOKEN_LOCALSTORAGE_KEY = 'accessToken';
const loginUrl = createLoginUrl();

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
        <a href={loginUrl}>Login</a>
      </div>
  )

  return (
    <div className='App'>

    </div>
  );
}

export default App;
