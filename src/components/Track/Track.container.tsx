import React from 'react';
import { ITrack } from '../../interfaces/track';
import Track from './Track';
import styles from './TrackList.module.scss';

interface Props {
    tracks: Array<ITrack>;
}

const TrackContainer = ({ tracks }: Props) => {
    return(
        <div>
            <h2>Tracks:</h2>
            <ul className={styles.trackList}>
                {tracks.map((track) => {
                    return (
                        <li className={styles.trackList__item} key={track.id}>
                            <Track data={track}/>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default TrackContainer;
