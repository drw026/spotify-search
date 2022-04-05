import { IArtistResponse, IArtist } from '../../../interfaces/artist';
import { ITrackResponse, ITrack } from '../../../interfaces/track';

export interface SearchResult {
    artists: Array<IArtist>;
    tracks: Array<ITrack>;
}

const search = async (searchQueryParameters: string): Promise<SearchResult | undefined> => {
    // TODO: Look for URL in localStorage first
    // console.log({
    //     [`${searchQueryParameters}`]: searchResult
    // })

    // TODO: Safe URL in localStorage

    try {
        const response = await fetch(`${process.env.REACT_APP_SPOTIFY_SEARCH_API_URL}?${searchQueryParameters}`, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('accessToken') || ''}`
            }
        });

        const jsonResponse = await response.json();

        return {
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
    } catch(error) {
        console.error(error);
        return;
    }
}

export default search;
