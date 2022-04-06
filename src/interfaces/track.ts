import { IArtistResponse } from './artist';

export interface ITrackResponse {
    id: string;
    duration_ms: number;
    name: string;
    album: {
        album_type: string;
        name: string;
        release_date: string;
    };
    artists: Array<IArtistResponse>;
    external_urls: {
        spotify: string;
    };
}

export interface ITrack {
    id: string;
    duration_ms: number;
    name: string;
    album: {
        album_type: string;
        name: string;
        release_date: string;
    };
    artists: string[];
    url: string;
}
