import React from 'react';
import { ITrack } from '../../interfaces/track';
import styles from './Track.module.scss';

interface Props {
    data: ITrack
}

const convertMstoTime = (miliseconds: number): string => {
    const date = new Date(miliseconds)
    return `${date.getMinutes()}:${date.getSeconds()}`;
}

const Track = ({ data }: Props) => {
    const { name, album,  duration_ms, artists, url } = data;

    return (
        <a className={styles.track} href={url} target="_blank" rel="noreferrer">
            <h3 className={styles.track__title}>{name} - {artists.join(', ')}</h3>
            <div className={styles.track__duration}>{convertMstoTime(duration_ms)}</div>
            <div className={styles.track__album}>From: {album.name} ({album.release_date})</div>
        </a>
    );
};

export default Track;
