import React, { useState } from 'react';
import { IArtistResponse } from '../../interfaces/artist';
import { ITrackResponse } from '../../interfaces/track';

const constructQueryParameters = (searchQuery: string) => {
    return new URLSearchParams({
        q: searchQuery,
        type: 'track,artist'
    }).toString();
}

const Search = () => {
    const [searchQuery, setSearhQuery] = useState<string>('');

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearhQuery(event.target.value);
    }

    const submitHandler = async(event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();

        const searchQueryParameters = constructQueryParameters(searchQuery);

        // TODO: Look for URL in localStorage first

        try {
            const response = await fetch(`${process.env.REACT_APP_SPOTIFY_SEARCH_API_URL}?${searchQueryParameters}`, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('accessToken') || ''}`
                }
            });

            const jsonResponse = await response.json();
            const mappedSearchResults = {
                artists: jsonResponse.artists.items.map((artist: IArtistResponse) => {
                    return {
                        id: artist.id,
                        name: artist.name,
                        url: artist.external_urls.spotify,
                    }
                }),
                tracks: jsonResponse.tracks.items.map((track: ITrackResponse) => {
                   return {
                       id: track.id,
                       duration_ms: track.duration_ms,
                       name: track.name,
                       album: {
                           album_type: track.album.album_type,
                           name: track.album.name,
                           release_date: track.album.release_date,
                       },
                       artists: track.artists.map((artist: IArtistResponse) => artist.name),
                       url: track.external_urls.spotify,
                   }
                }),
            }

            console.log(mappedSearchResults)

        } catch(error) {}

        // TODO: add searchQueryParameters to localStorage
    }

    return (
        <div>
            <form action="POST" onSubmit={submitHandler}>
                <input onChange={inputChangeHandler} type="text" name="searchquery" />
                <button>Zoek</button>
            </form>
        </div>
    )
};

export default Search;
