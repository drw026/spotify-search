import React from 'react';
import { useAppContext } from '../App/App.context';
import ArtistContainer from '../Artist/Artist.container';
import TrackContainer from '../Track/Track.container';
import useSearchResults from '../../hooks/useSearchResults';

const Result = () => {
    const { query } = useAppContext();
    const { error, data, isLoading } = useSearchResults(query);

    if (error) return null;

    return (
        <>
            {isLoading && <div>Loading...</div>}
            {data && data.artists.length > 0 && (<ArtistContainer artists={data.artists} />)}
            {data && data.tracks.length > 0 && (<TrackContainer tracks={data.tracks} />)}
        </>
    );
}

export default Result;
