import React from 'react';
import Result from './Result';
import {useAppContext} from '../App/App.context';

const ResultContainer = () => {
    const { query } = useAppContext();

    return (
        <>
            <Result query={query}/>
        </>
    )
};

export default ResultContainer;
