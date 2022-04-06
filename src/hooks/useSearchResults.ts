import { useState, useEffect } from 'react';
import {IArtist, IArtistResponse} from '../interfaces/artist';
import {ITrack, ITrackResponse} from '../interfaces/track';
import { LIMIT, TYPE_SEARCH } from '../config/search';

interface SearchResponse {
    artists: {
        items: Array<IArtistResponse>
    }
    tracks: {
        items: Array<ITrackResponse>
    };
}

interface SearchResult {
    artists: Array<IArtist>;
    tracks: Array<ITrack>;
}

const constructQueryParameters = (searchQuery: string) => {
    return new URLSearchParams({
        q: searchQuery,
        type: TYPE_SEARCH,
        limit: LIMIT.toString(),
    }).toString();
}

const extractDataFromResponse = (response: SearchResponse): SearchResult => {
    return {
        artists: response.artists.items.map((artist: IArtistResponse) => {
            return {
                id: artist.id,
                name: artist.name,
                url: artist.external_urls.spotify,
            }
        }),
        tracks: response.tracks.items.map((track: ITrackResponse) => {
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
}

const useSearchResults = (query: string) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<SearchResult | undefined>(undefined);
    const [error, setError] = useState<Error | null>(null);

    const fetchResult = async (searchQueryParameters: string) => {
        try {
            setIsLoading(true)
            const response = await fetch(`${process.env.REACT_APP_SPOTIFY_SEARCH_API_URL}?${searchQueryParameters}`, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('accessToken') || ''}`
                }
            });
            const jsonResponse = await response.json();
            const searchResult = extractDataFromResponse(jsonResponse);

            setData(searchResult);
        } catch (error) {
            setError(error as Error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (!query) return;
        const searchQueryParameters = constructQueryParameters(query);

        fetchResult(searchQueryParameters);
    }, [query])

    return {data, error, isLoading};
};

export default useSearchResults;
