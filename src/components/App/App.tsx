import React, { useState, useEffect } from 'react';
import createLoginUrl from './util/createLoginUrl';
import extractFromHash from '../../util/extractFromHash';
import Search from '../Search/Search';
import appContext from './App.context';
import styles from './App.module.scss';
import ResultContainer from '../Result/Result.container';
import Login from '../Login/Login';
import { readCookie, setCookie } from '../../util/readCookie';

const ACCESSTOKEN_SESSION_KEY = 'accessToken';
const VALIDACCESS_COOKIE_KEY = 'validAccess';
const loginUrl = createLoginUrl();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    const accessTokenFromSessionStorage = window.sessionStorage.getItem(ACCESSTOKEN_SESSION_KEY);
    const isValidAccess = !!readCookie(VALIDACCESS_COOKIE_KEY);
    const hash = window.location.hash;

    if (accessTokenFromSessionStorage && isValidAccess) return setIsLoggedIn(true);
    if (hash) {
      window.sessionStorage.setItem(ACCESSTOKEN_SESSION_KEY, extractFromHash(hash, 'access_token'))
      setCookie(VALIDACCESS_COOKIE_KEY, 1, {
        path: '/',
        expires: 3600 * 1000,
      })
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
