import { useState, useEffect, useCallback } from 'react';
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
    query: string;
    artists: Array<IArtist>;
    tracks: Array<ITrack>;
}

interface SearchHistoryItem {
    [key: string]: SearchResult
}

const constructQueryParameters = (searchQuery: string) => {
    return new URLSearchParams({
        q: searchQuery.toLowerCase(),
        type: TYPE_SEARCH,
        limit: LIMIT.toString(),
    }).toString();
}

const extractDataFromResponse = (response: SearchResponse, query: string): SearchResult => {
    return {
        query,
        artists: response.artists.items.map((artist: IArtistResponse) => {
            return {
                id: artist.id,
                name: artist.name,
                url: artist.external_urls.spotify,
                imageUrl: artist.images.pop()?.url
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

const getResultFromSearchHistory = (searchQueryParameters: string, history: Array<SearchHistoryItem> | null): SearchHistoryItem | undefined => {
  return history
      ? history.find((item: SearchHistoryItem) => item.hasOwnProperty(searchQueryParameters))
      : undefined;
}

const useSearchResults = (query: string) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<SearchResult | undefined>(undefined);
    const [error, setError] = useState<Error | null>(null);

    const fetchResult = useCallback(async (searchQueryParameters: string) => {
        try {
            setIsLoading(true)
            const searchHistory = JSON.parse(window.localStorage.getItem('searchHistory') || '[]');
            const queryInSearchHistory = getResultFromSearchHistory(searchQueryParameters, searchHistory);

            if (queryInSearchHistory) return setData(Object.values(queryInSearchHistory)[0]);

            const response = await fetch(`${process.env.REACT_APP_SPOTIFY_SEARCH_API_URL}?${searchQueryParameters}`, {
                headers: {
                    Authorization: `Bearer ${window.sessionStorage.getItem('accessToken') || ''}`
                }
            });

            const jsonResponse = await response.json();

            if (response.status === 400) {
                throw new Error('INVALID_BEARER_TOKEN');
            }

            const searchResult = extractDataFromResponse(jsonResponse, query);

            searchHistory.push({ [`${searchQueryParameters}`]: searchResult });
            window.localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

            setData(searchResult);
        } catch (error) {
            setError(error as Error)
        } finally {
            setTimeout(() => {
                setIsLoading(false)
            }, 500);
        }
    }, [query]);

    useEffect(() => {
        if (!query) return;
        const searchQueryParameters = constructQueryParameters(query);

        fetchResult(searchQueryParameters);
    }, [query, fetchResult])

    return {data, error, isLoading};
};

export default useSearchResults;
