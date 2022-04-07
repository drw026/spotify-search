export interface IArtistResponse {
    id: string;
    name: string;
    external_urls: {
        spotify: string;
    };
    images: Array<{
        height: number,
        url: string,
        width: number
    }>;
}

export interface IArtist {
    id: string;
    name: string;
    url: string;
    imageUrl: string | undefined;
}
