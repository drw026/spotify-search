export interface IArtistResponse {
    id: string;
    name: string;
    external_urls: {
        spotify: string;
    };
}

export interface IArtist {
    id: string;
    name: string;
    url: string;
}
