import React from 'react';
import styles from './Login.module.scss';

interface Props {
    loginUrl: string;
}

const Login = ({ loginUrl }: Props) => {
    return (
        <div className={styles.login}>
            <div className={styles.login__inner}>
                <h1 className={styles.login__title}>Spotify search</h1>
                <p>Login om deze Spotify zoek service te kunnen gebruiken.</p>
                <a className={styles.login__button} href={loginUrl}>Inloggen</a>
            </div>
        </div>
    )
}

export default Login;
