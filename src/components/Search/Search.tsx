import React, { useState } from 'react';
import search from './service/search';
import styles from './Search.module.scss';
import { useAppContext } from '../App/App.context';

const constructQueryParameters = (searchQuery: string) => {
    return new URLSearchParams({
        q: searchQuery,
        type: 'track,artist',
        limit: '10',
    }).toString();
}

const Search = () => {
    const [searchQuery, setSearhQuery] = useState<string>('');
    const { setSearchResult } = useAppContext();

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearhQuery(event.target.value);
    }

    const submitHandler = async(event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();

        const searchQueryParameters = constructQueryParameters(searchQuery);

        // TODO: Look for URL in localStorage first
        const searchResult = await search(searchQueryParameters);
        // console.log({
        //     [`${searchQueryParameters}`]: searchResult
        // })

        if (searchResult) {
            // TODO: add searchQueryParameters to localStorage
            setSearchResult(searchResult);
        }
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
