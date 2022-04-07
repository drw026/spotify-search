import React from 'react';
import { ITrack } from '../../interfaces/track';
import styles from './Track.module.scss';

interface Props {
    data: ITrack
}

const convertMstoTime = (miliseconds: number): string => {
    const date = new Date(miliseconds)
    return `${date.getMinutes()}:${date.getSeconds().toString().padStart(2, '0')}`;
}

const Track = ({ data }: Props) => {
    const { name, album,  duration_ms, artists, url } = data;

    return (
        <a className={styles.track} href={url} target="_blank" rel="noreferrer">
            <div className={styles.track__mainInfo}>
                <h3 className={styles.track__title}>{name}</h3>
                <p className={styles.track__artists}>{artists.join(', ')}</p>
            </div>
            <div className={styles.track__album}>{album.name}</div>
            <div className={styles.track__duration}>{convertMstoTime(duration_ms)}</div>
        </a>
    );
};

export default Track;
