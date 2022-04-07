import React from 'react';
import Artist from './Artist';
import {IArtist} from '../../interfaces/artist';
import styles from './ArtistList.module.scss';

interface Props {
    artists: Array<IArtist>;
}

const ArtistContainer = ({ artists }: Props) => {
    return (
        <div>
            <h2>Artists:</h2>
            <div className={styles.artistList}>
                {artists.map((artist) => (<Artist key={artist.id} data={artist}/>))}
            </div>
        </div>
    );
}

export default ArtistContainer;
