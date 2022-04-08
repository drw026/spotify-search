import React, { useState } from 'react';
import styles from './Search.module.scss';
import { useAppContext } from '../App/App.context';
import Microphone from '../Microphone/Microphone';

const Search = () => {
    const [searchQuery, setSearhQuery] = useState<string>('');
    const { setQuery } = useAppContext();

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearhQuery(event.target.value);
    }

    const submitHandler = async(event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        setQuery(searchQuery);
        setSearhQuery('');
        event.target.reset();
    }

    const setSearchQueryFromSpeech = (query: string) => {
        setSearhQuery(query);
    }

    return (
        <>
            <form className={styles.search} onSubmit={submitHandler}>
                <div className={styles.search__inputWrapper}>
                    <input
                        className={styles.search__input}
                        onChange={inputChangeHandler}
                        type="search"
                        name="searchquery"
                        autoComplete="off"
                        autoFocus
                    />
                </div>
                <Microphone setQuery={setSearchQueryFromSpeech} />
                <button className={styles.search__button}>Zoek</button>
            </form>
        </>
    )
};

export default Search;
