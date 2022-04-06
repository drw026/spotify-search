import React, { useState } from 'react';
import styles from './Search.module.scss';
import { useAppContext } from '../App/App.context';

const Search = () => {
    const [searchQuery, setSearhQuery] = useState<string>('');
    const { setQuery } = useAppContext();

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearhQuery(event.target.value);
    }

    const submitHandler = async(event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        setQuery(searchQuery);
    }

    return (
        <>
            <form className={styles.search} onSubmit={submitHandler}>
                <input className={styles.search__input} onChange={inputChangeHandler} type="search" name="searchquery" />
                <button className={styles.search__button}>Zoek</button>
            </form>
        </>
    )
};

export default Search;
