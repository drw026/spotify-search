import React from 'react';
import {IArtist} from '../../interfaces/artist';

interface Props {
    data: IArtist;
}

const Artist = ({ data }: Props) => {
    const { url, name } = data;

    return (
        <>
            <a href={url} target="_blank" rel="noreferrer">{name}</a>
        </>
    )
}

export default Artist;
