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

    if (error) {
        if (error.message === 'INVALID_BEARER_TOKEN') {
            setTimeout(() => {
                window.location.reload();
            }, 3000);

            return (<p>Jouw sessie is verlopen. Je wordt binnen enkele seconden automatisch naar het inlogscherm doorverwezen.</p>);
        }

        return (
            <p>Er is een fout opgetreden.</p>
        )
    }

    if (isLoading) return (
        <div className={`${styles.result} ${styles.result__loading}`}>
            <Loader />
        </div>
    );

    if (!data) return null;

    if (data.artists.length === 0 && data.tracks.length === 0) return (
        <p>Geen resultaten gevonden.</p>
    );

    return (
        <div className={styles.result}>
            <p>Gevonden resultaten voor: <strong>{data.query}</strong></p>
            {data.artists.length > 0 && (<ArtistContainer artists={data.artists} />)}
            {data.tracks.length > 0 && (<TrackContainer tracks={data.tracks} />)}
        </div>
    );
}

export default Result;
