import React from 'react';
import Artist from './Artist';
import {IArtist} from '../../interfaces/artist';

interface Props {
    artists: Array<IArtist>;
}

const ArtistContainer = ({ artists }: Props) => {
    return (
        <div>
            <h2>Artists:</h2>
            <ul>
                {artists.map((artist) => {
                    return (
                        <li key={artist.id}>
                            <Artist data={artist}/>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default ArtistContainer;
