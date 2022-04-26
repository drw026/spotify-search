import React, { useState, useEffect } from 'react';
import createLoginUrl from './util/createLoginUrl';
import extractFromHash from '../../util/extractFromHash';
import Search from '../Search/Search';
import appContext from './App.context';
import styles from './App.module.scss';
import ResultContainer from '../Result/Result.container';
import Login from '../Login/Login';

const ACCESSTOKEN_SESSION_KEY = 'accessToken';
const loginUrl = createLoginUrl();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    const accessTokenFromSessionStorage = window.sessionStorage.getItem(ACCESSTOKEN_SESSION_KEY);
    const hash = window.location.hash;

    if (accessTokenFromSessionStorage) return setIsLoggedIn(true);
    if (hash) {
      window.sessionStorage.setItem(ACCESSTOKEN_SESSION_KEY, extractFromHash(hash, 'access_token'))
      window.location.hash = '';
      setIsLoggedIn(true);
    }
  }, []);

  if (!isLoggedIn) return (
      <>
        <Login loginUrl={loginUrl} />
      </>
  )

  return (
    <div className={styles.app}>
      <appContext.Provider value={{ query, setQuery }}>
        <Search />
        <ResultContainer />
      </appContext.Provider>
    </div>
  );
}

export default App;
