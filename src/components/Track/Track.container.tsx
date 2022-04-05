import React from 'react';
import { ITrack } from '../../interfaces/track';
import Track from './Track';

interface Props {
    tracks: Array<ITrack>;
}

const TrackContainer = ({ tracks }: Props) => {
    return(
        <div>
            <h2>Tracks:</h2>
            <ul>
                {tracks.map((track) => {
                    return (
                        <li key={track.id}>
                            <Track data={track}/>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default TrackContainer;
