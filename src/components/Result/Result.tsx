import React from 'react';
import { useAppContext } from '../App/App.context';

const Result = () => {
    const { searchResult } = useAppContext();

    if (!searchResult) return null;

    return (
        <>

        </>
    );
}

export default Result;
