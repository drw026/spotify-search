const createLoginUrl = () => {
    const AUTHORIZE_URI = process.env.REACT_APP_SPOTIFY_AUTHORIZE_URI || '';
    const AUTHORIZE_PARAMETERS: {[key: string]: string} = {
        response_type: 'token',
        client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID || '',
        redirect_uri: process.env.REACT_APP_SPOTIFY_REDIRECT_URI || 'http://localhost:3000',
    }

    return `${AUTHORIZE_URI}?${new URLSearchParams(AUTHORIZE_PARAMETERS).toString()}`;
}

export default createLoginUrl;
