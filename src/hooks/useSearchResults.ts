import React, { useState, useEffect } from 'react';
import {IArtist, IArtistResponse} from '../interfaces/artist';
import {ITrack, ITrackResponse} from '../interfaces/track';

export interface SearchResult {
    artists: Array<IArtist>;
    tracks: Array<ITrack>;
}

const constructQueryParameters = (searchQuery: string) => {
    return new URLSearchParams({
        q: searchQuery,
        type: 'track,artist',
        limit: '10',
    }).toString();
}

const useSearchResults = (searchQueryParameters: string) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<SearchResult | undefined>(undefined);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        (
            async () => {
                try{
                    setIsLoading(true)
                    const response = await fetch(`${process.env.REACT_APP_SPOTIFY_SEARCH_API_URL}?${constructQueryParameters(searchQueryParameters)}`, {
                        headers: {
                            Authorization: `Bearer ${window.localStorage.getItem('accessToken') || ''}`
                        }
                    });
                    const jsonResponse = await response.json();
                    const filteredResponse = {
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

                    setData(filteredResponse);
                }
                catch(error){
                    setError(error as Error)
                }finally{
                    setIsLoading(false)
                }
            }
        )()
    },[searchQueryParameters])

    return { data, error, isLoading };
};

export default useSearchResults;
