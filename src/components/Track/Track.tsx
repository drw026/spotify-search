import React from 'react';
import { ITrack } from '../../interfaces/track';

interface Props {
    data: ITrack
}

const Track = ({ data }: Props) => {
    const { name, album,  duration_ms, artists, url } = data;

    return (
        <>
            <a href={url} target="_blank" rel="noreferrer">{name} - {artists.join(', ')}</a><br />
            <span>{duration_ms}</span><br />
            <span>From: {album.name} {album.release_date}</span>
        </>
    );
};

export default Track;
