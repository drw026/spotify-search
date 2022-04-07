import React from 'react';
import ArtistContainer from '../Artist/Artist.container';
import TrackContainer from '../Track/Track.container';
import useSearchResults from '../../hooks/useSearchResults';
import Loader from '../Loader/Loader';
import styles from './Result.module.scss';

interface Props {
    query: string;
}

const Result = ({ query }: Props) => {
    const { error, data, isLoading } = useSearchResults(query);

    if (error) return null;
    if (isLoading) return (
        <div className={`${styles.result} ${styles.result__loading}`}>
            <Loader />
        </div>
    );

    return (
        <div className={styles.result}>
            {data && data.artists.length > 0 && (<ArtistContainer artists={data.artists} />)}
            {data && data.tracks.length > 0 && (<TrackContainer tracks={data.tracks} />)}
        </div>
    );
}

export default Result;
